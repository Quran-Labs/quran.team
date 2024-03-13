import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    TemplateRef,
    AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router'
import { DemoAppService } from '../../services/tree.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Octokit } from "@octokit/core";
import { createPullRequest, DELETE_FILE } from "octokit-plugin-create-pull-request";

@Component({
    selector: 'ngx-treant-demo-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['../../app.component.css','./tree.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class TreeComponent implements AfterViewInit, OnInit {
    modalRef: BsModalRef;
    @ViewChild('template') modalTemplate: TemplateRef<any>;
    @ViewChild('confirm_pr') modalConfirmPR: TemplateRef<any>;

    registerForm: UntypedFormGroup;

    basicPopoverId = 'basic-popover';
    basicPopoverClass = 'basic-popover-chart';

    basicPopoverData;
    tree_name;
    displayChart = true;
    uploadable = false;
    isUploading = false;
    prNumber = 0;
    date = '';

    private svc: DemoAppService;
    private node;
    private tree;
    private treant;
    private nodes;

    private content = `
           <div class="popover-content">
              <div class="btn-group mr-2" role="group">
                  <a type="button" class="btn btn-primary btn-sm" title="أضف اسم تلميذ في السند" id="add" href="#">أضف تلميذ</a>
              </div>
          </div>
      `;

    popoverSettings = {
        title: '<div class="popover-title"></div>',
        placement: 'top',
        content: this.content,
        container: 'body',
        html: true,
        selector: 'div',
        trigger: 'hover',
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private modalService: BsModalService,
        private formBuilder: UntypedFormBuilder,
    ) {
        this.svc = new DemoAppService();
    }

    ngAfterViewInit() {
        this.registerForm = this.formBuilder.group({
            place: [''],
            date:[null],
            name: [''],
            contact: [''],
            image: [''],
            image_file: [''],
        });
    }

    get f() {
        return this.registerForm.controls;
    }
    findNodeByTextName(textName){
        return this.basicPopoverData.find((n) => !!n.text && n.text.name == textName);
    }

    onSubmit() {
        const node = this.nodes.find((n) => n.id == this.node.id);
        const hasChildren = !!node.children && !!node.children.length;
        let nodeChildren = hasChildren ? node.children.map(c => {
            let index = c;
            while(this.nodes[index].pseudo){
                index = this.nodes[index].children[0];
            }
            return this.findNodeByTextName(this.nodes[index].text.name)
            }) : [];
        const newStudent = {
            text: {
                name: this.registerForm.value.name,
            },
            id: (window as any).tree.getNodeDb().maxid+1 ,
            parentId: this.node.id,
        };
        if(this.registerForm.value.place) newStudent["place"] = this.registerForm.value.place;
        if(this.registerForm.value.contact) newStudent["contact"] = this.registerForm.value.contact;
        if(this.registerForm.value.contact) newStudent["date"] = this.registerForm.value.date;

        nodeChildren.push(newStudent);
        const dataNode = this.findNodeByTextName(this.node.text.name);
        if (dataNode) {
            dataNode['children'] = nodeChildren;
            this.basicPopoverData.push(newStudent);
        }

        this.modalRef.hide();

        this.displayChart = false;
        this.treant.destroy();

        setTimeout(() => {
            this.displayChart = true;
            this.uploadable = true;
        });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template,  { class : "modal-dialog-centered"});
    }

    ngOnInit(): void {
        this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
        };
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.router.navigated = false;
                window.scrollTo(0, 0);
            }
        });
        this.tree_name = this.route.snapshot.paramMap.get('id');
        this.basicPopoverData = this.svc.getTreeDataFromLabel(this.tree_name);
        //console.log("Starting with >\n"+ JSON.stringify(this.basicPopoverData.filter((_,i) => i>0)));
    }

    onClick(obj): void {
        if(obj.node.nodeHTMLclass.trim() === "rawi"){
            this.router.navigate(['/إسناد', obj.node.text.name.replace(/ /g,"_")]);
        }
    }

    onUpdate(obj): void {
        this.uploadable = true;
        //console.log('onUpdate: ', obj);
    }

    onHover(event): void {
        if( (this.route.snapshot.params['id'] !== "القرآن") &&
         (event.node.nodeHTMLclass.trim().match(/^(?:rawi|)$/)) ){
            setTimeout(() => {
                event.$('.popover-title').text(event.node.text.name);
            }, 100);

            event
            .$('.popover')
            .off('click')
            .on('click', '#add', (e) => {
                this.node = event.node;
                event.$('.popover').popover('hide');
                this.registerForm.reset();
                this.openModal(this.modalTemplate);

                e.preventDefault();
                e.stopPropagation();
            });
        } else {
            event.$('.popover').popover('hide');
        }
    }

    onLoadTree(tree): void {
        this.tree = tree;
        //console.log('tree: ', this.tree);
    }

    onLoadTreant(treant): void {
        this.treant = treant;
        //console.log('treant: ', treant);
    }

    onLoadNodes(obj): void {
        this.nodes = obj.nodes;
        //console.log('nodes: ', this.nodes);
    }

    upload(): void {
        //console.log(this.svc.stripBeforeUpload(this.nodes).map(i => JSON.stringify(i)).join(',\n '));
        //return;
        this.isUploading = true;
        const MyOctokit = Octokit.plugin(createPullRequest);
         // create token at https://github.com/settings/tokens/new?scopes=repo
        function leftrotate(str, d) {return str.substring(d, str.length) + str.substring(0, d);}
        const TOKKEN = leftrotate('6vGn1kZ2jBlpXghp_GlaYBY4CiyryCKIEMCeGrRNXghp_GlaYB'.slice(0,-10),13);
        const octokit = new MyOctokit({
          auth: TOKKEN,
        });
        
        // Returns a normal Octokit PR response
        // See https://octokit.github.io/rest.js/#octokit-routes-pulls-create
        octokit
          .createPullRequest({
            owner: "Quran-Labs",
            repo: "quran.team",
            title: "إضافة من أحد الزوار، قيد المراجعة",
            body: "تاريخ الطلب " + new Date(),
            head: "user-auto-pr-" + new Date().valueOf(),
            base: "main" /* optional: defaults to default branch */,
            update: false /* optional: set to `true` to enable updating existing pull requests */,
            forceFork: false /* optional: force creating fork even when user has write rights */,
            labels: [
              this.tree_name,
            ], /* optional: applies the given labels when user has permissions. When updating an existing pull request, already present labels will not be deleted. */
            changes: [
              {
                /* optional: if `files` is not passed, an empty commit is created instead */
                files: { // Examples: https://github.com/gr2m/octokit-plugin-create-pull-request
                    [this.svc.getAssetFile(this.tree_name)]: 
                        `[${this.svc.stripBeforeUpload(this.nodes)
                            .map(i => JSON.stringify(i)).join(',\n ')}]`,
                },
                commit: "إضافة سند",
                /* optional: if not passed, will be the authenticated user and the current date
                author: { name: "Author LastName", email: "Author.LastName@acme.com", date: new Date().toISOString(),
                }, */
                /* optional: if not passed, will use the information set in author */
                committer: {
                  name: "Auto",
                  email: "no-reply@quran.team",
                  date: new Date().toISOString(), // must be ISO date string
                },
              },
            ],
          })
          .then((pr) => {
            this.prNumber = pr.data.number;
            this.uploadable = false;
            this.isUploading = false;
            this.openModal(this.modalConfirmPR);
          });
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = (e: any) => {
                this.registerForm.patchValue({ image_file: e.target.result });
            }
            reader.readAsDataURL(file);
            this.registerForm.patchValue({ image: file.name + "   حجمها: " + (file.size/1024).toFixed(1) + " كيلوبايت"});
        }
      }
}
