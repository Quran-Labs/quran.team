import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    TemplateRef,
    AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router'
import { TreeService } from '../../services/tree.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';

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
    prNumber = 0;
    date = '';

    private node;
    private tree;
    private treant;
    private nodes;
    protected selectedNodeName;

    private content = `
            <div class="popover-content"></div>
      `;

    popoverSettings = {
        title: '<div class="popover-title"></div>',
        placement: 'bottom',
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
        private treeService: TreeService

    ) {}

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
    make_hover_content($, elem, node){
        var hover = $('<div id="hover_node"></div>');
        elem.append(hover);        
        if(node.place){
            var e = $('<div>⌂ المولود في: ' + node.place + '</div>');
            hover.append(e);
            e.attr('id', 'hover_place');
        }
        if(node.date){
            var e = $('<div>◈ المتوفي عام: ' + node.date + ' هـ</div>');
            hover.append(e);
            e.attr('id', 'hover_date');
        }
        var bg = $('<div class="btn-group mr-2" role="group"></div>');
        elem.append(bg);
        var e = $('<a type="button" class="btn btn-primary btn-sm" title="أضف اسم تلميذ في السند" id="add" href="#">أضف تلميذ</a>');
        bg.append(e);
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
        if(this.registerForm.value.date) newStudent["date"] = this.registerForm.value.date;
        if(this.registerForm.value.image_file) newStudent["image_file"] = this.treeService.getExtension(this.registerForm.value.image_file.split(';')[0]);

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
            setTimeout(() => {
                this.setPrData();
            });
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
        this.basicPopoverData = this.treeService.getTreeDataFromLabel(this.tree_name);
        this.treeService.PrNumber$.subscribe((n)=>{
            if(n>0){
                this.prNumber = n;
                this.openModal(this.modalConfirmPR);
            }
        })
        //console.log("Starting with >\n"+ JSON.stringify(this.basicPopoverData.filter((_,i) => i>0)));
    }

    onClick(obj): void {
        /*if(obj.node.nodeHTMLclass.trim() === "rawi"){
            this.router.navigate(['/إسناد', obj.node.text.name.replace(/ /g,"_")]);
        }*/
    }

    onUpdate(obj): void {
        this.setPrData();
        //console.log('onUpdate: ', obj);
    }

    onHover(event): void {
        if( (this.route.snapshot.params['id'] !== "القرآن") &&
         (event.node.nodeHTMLclass.trim().match(/^(?:rawi|)$/)) ){
            event.$('.popover-title').text(event.node.text.name);
            this.make_hover_content(event.$, event.$('.popover-content'), event.node);

            event
            .$('.popover')
            .off('click')
            .on('click', '#add', (e) => {
                this.node = event.node;
                //event.$('.popover').popover('hide');
                event.$(".popover")[0].hidden = true;
                this.registerForm.reset();
                this.selectedNodeName = event.node.text.name;
                this.openModal(this.modalTemplate);
                e.preventDefault();
                e.stopPropagation();
            });
        } else if( event.node.nodeHTMLclass.trim().match(/^(?:rawi|)$/)) {
            event.$('.popover-title').text(event.node.text.name);
            event.$('.popover-content').text("⊙ اضغط هنا لسند الراوي");
        } else {
            event.$('.popover-title').text(event.node.text.name);
            event.$('.popover-content').text("↓ اختر أخفض راوٍ");
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
    private setPrData(): void{
        var image_content = this.registerForm.value.image_file ? this.registerForm.value.image_file.split(',')[1] : "";
        var image_mime = this.registerForm.value.image_file ? this.registerForm.value.image_file.split(';')[0] : "";
        this.treeService.setPrData({
            tree_name: this.tree_name,
            nodes: this.nodes,
            max_id: (window as any).tree.getNodeDb().maxid,
            image_mime: image_mime,
            image_content: image_content,
        });
        this.treeService.setUploadable(true);
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
