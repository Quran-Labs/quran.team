import { Injectable } from '@angular/core';
import { Octokit } from "@octokit/core";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import { BehaviorSubject } from 'rxjs';

import top from '../../assets/top.json';
import qaloon from '../../assets/qaloon.json';
import warsh from '../../assets/warsh.json';
import ibn_wardan from '../../assets/ibn_wardan.json';
import ibn_jumaz from '../../assets/ibn_jumaz.json';
import qonbol from '../../assets/qonbol.json';
import bazzy from '../../assets/bazzy.json';
import doory_amr from '../../assets/doory_amr.json';
import soosy from '../../assets/soosy.json';
import rawh from '../../assets/rawh.json';
import rowais from '../../assets/rowais.json';
import hafs from '../../assets/hafs.json';
import shoba from '../../assets/shoba.json';
import hisham from '../../assets/hisham.json';
import ibn_thakwan from '../../assets/ibn_thakwan.json';
import khalaf from '../../assets/khalaf.json';
import khallad from '../../assets/khallad.json';
import ishaq from '../../assets/ishaq.json';
import edrees from '../../assets/edrees.json';
import abo_elharith from '../../assets/abo_elharith.json';
import doory_kasaiy from '../../assets/doory_kasaiy.json';

@Injectable({
    providedIn: 'root',
})
export class TreeService {

    private config: any = [];

    constructor() {
        this.config = [{
            container: '#basic-popover',
            scrollbar: "None",
            node: {
                collapsable: false,
            },
            animation: {
                nodeAnimation: 'easeOutBounce',
                nodeSpeed: 700,
                connectorsAnimation: 'bounce',
                connectorsSpeed: 700,
            },
        }];
    }

    private uploadable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isUploading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private prData: BehaviorSubject<any> = new BehaviorSubject<any>({});
    private prNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    uploadable$ = this.uploadable.asObservable();
    isUploading$ = this.isUploading.asObservable();
    PrData$ = this.prData.asObservable();
    PrNumber$ = this.prNumber.asObservable();
    
    setUploadable(val: boolean) { return this.uploadable.next(val); }
    setIsUploading(val: boolean) { return this.isUploading.next(val); }
    setPrData(newData: any): void { this.prData.next(newData);}
    setPrNumber(num: number): void { this.prNumber.next(num); }

    upload(): void {
        console.log(this.stripBeforeUpload(this.prData.value.nodes).map(i => JSON.stringify(i)).join(',\n '));
        //return;
        this.setIsUploading(true);
        const MyOctokit = Octokit.plugin(createPullRequest);
         // create token at https://github.com/settings/tokens/new?scopes=repo
        function leftrotate(str, d) {return str.substring(d, str.length) + str.substring(0, d);}
        const TOKKEN = leftrotate('6vGn1kZ2jBlpXghp_GlaYBY4CiyryCKIEMCeGrRNXghp_GlaYB'.slice(0,-10),13);
        const octokit = new MyOctokit({
          auth: TOKKEN,
        });
        
        var image_mime = this.prData.value.image_mime;
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
                this.prData.value.tree_name,
            ], /* optional: applies the given labels when user has permissions. When updating an existing pull request, already present labels will not be deleted. */
            changes: [
              {
                /* optional: if `files` is not passed, an empty commit is created instead */
                files: { // Examples: https://github.com/gr2m/octokit-plugin-create-pull-request
                    [this.getAssetFile(this.prData.value.tree_name)]: 
                        `[${this.stripBeforeUpload(this.prData.value.nodes)
                            .map(i => JSON.stringify(i)).join(',\n ')}]`,
                    [this.getImageAssetFile(this.prData.value.tree_name,
                                            this.prData.value.max_id,
                                                image_mime )]: {
                        content: this.prData.value.image_content,
                        encoding: "base64",
                      }
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
            this.setPrNumber(pr.data.number);
            this.setUploadable(false);
            this.setIsUploading(false);
          });
    }
    
    getTreeDataFromLabel(label=""): any {
        switch (label) {
            case 'قالون':
                return this.config.concat(qaloon);
            case 'ورش':
                return this.config.concat(warsh);
            case 'ابن_وردان':
                return this.config.concat(ibn_wardan);
            case 'ابن_جماز':
                return this.config.concat(ibn_jumaz);
            case 'قنبل':
                return this.config.concat(qonbol);
            case 'البزي':
                return this.config.concat(bazzy);
            case 'الدوري':
                return this.config.concat(doory_amr);
            case 'السوسي':
                return this.config.concat(soosy);
            case 'روح':
                return this.config.concat(rawh);                                    
            case 'رويس':
                return this.config.concat(rowais);
            case 'حفص':
                return this.config.concat(hafs);
            case 'شعبة':
                return this.config.concat(shoba);
            case 'هشام':
                return this.config.concat(hisham);
            case 'ابن_ذكوان':
                return this.config.concat(ibn_thakwan);
            case 'خلف':
                return this.config.concat(khalaf);
            case 'خلاد':
                return this.config.concat(khallad);
            case 'إسحاق':
                return this.config.concat(ishaq);
            case 'إدريس':
                return this.config.concat(edrees);  
            case 'أبو_الحارث':
                return this.config.concat(abo_elharith);
            case 'الـدوري':
                return this.config.concat(doory_kasaiy); //
            default:
                return this.config.concat(top);
        }
    }
    getExtension(file_mime: string): string{
        return file_mime.split('/')[1];
    }
    private getAssetFile(tree_name: any) {
        const path = "src/assets/"
        switch (tree_name) {
            case 'قالون':
                return path.concat("qaloon.json");
            case 'ورش':
                return path.concat("warsh.json");
            case 'ابن_وردان':
                return path.concat("ibn_wardan.json");
            case 'ابن_جماز':
                return path.concat("ibn_jumaz.json");
            case 'قنبل':
                return path.concat("qonbol.json");
            case 'البزي':
                return path.concat("bazzy.json");
            case 'الدوري':
                return path.concat("doory_amr.json");
            case 'السوسي':
                return path.concat("soosy.json");
            case 'روح':
                return path.concat("rawh.json");                                    
            case 'رويس':
                return path.concat("rowais.json");
            case 'حفص':
                return path.concat("hafs.json");
            case 'شعبة':
                return path.concat("shoba.json");
            case 'هشام':
                return path.concat("hisham.json");
            case 'ابن_ذكوان':
                return path.concat("ibn_thakwan.json");
            case 'خلف':
                return path.concat("khalaf.json");
            case 'خلاد':
                return path.concat("khallad.json");
            case 'إسحاق':
                return path.concat("ishaq.json");
            case 'إدريس':
                return path.concat("edrees.json");  
            case 'أبو_الحارث':
                return path.concat("abo_elharith.json");
            case 'الـدوري':
                return path.concat("doory_kasaiy.json"); //
            default:
                return path.concat("top.json");
        }
    }
    private getImageAssetFile(tree_name: string, id: number, file_mime: string): string | null{
        if(file_mime == "") return null;
        return "assets/img/"+tree_name+"/"+id+"."+this.getExtension(file_mime);
    }
    private stripBeforeUpload(nodes=[]):[any] {
        const allowed = ['text', 'name', 'data_id', 'parentId', 'nodeHTMLclass', 
                        'pseudo', 'image', 'uncles', 'childrenDropLevel',
                        'place', 'contact', 'date', 'order', 'image_file'];
        const dict = {
            "data_id": "id",
            "parentId": "parent",
            "nodeHTMLclass": "HTMLclass"
          };
        var pseudo_parents = {};
        var sort_ids = function(a,b){
            if(a[0] == "id") return -1;
            if(b[0] == "id") return  1;
            if(a[0] == "parent") return -1;
            if(b[0] == "parent") return  1;
            if(a[0] == "text") return -1;
            if(b[0] == "text") return  1;
            return a[0].localeCompare(b[0]);
        }
        return nodes.filter(e => typeof e != 'string').reduce((arr, current, _, nodes) => {
            if (current.pseudo) { //Look recursively for the real parent when dropLevel
                var tmp_parent = current.parentId;
                while(nodes[tmp_parent].pseudo && nodes[tmp_parent].id != 0){
                    tmp_parent = nodes[tmp_parent-1].parentId; // Account for missing separator
                }
                pseudo_parents[current.id] = tmp_parent;
            } else {
                const filtered = Object.keys(current)
                .filter((key) => allowed.includes(key))
                .reduce((obj, key) => {
                    if(current[key] != null && current[key] !== "" && current[key].length !== 0){
                        let newkey = (key in dict)? dict[key]: key;
                        obj[newkey] = current[key];
                    }
                    if(obj["parent"]<0){
                        delete obj["parent"];
                    }
                    if(obj["HTMLclass"] != "rawi"){
                        delete obj["order"];
                    }
                    return Object.fromEntries(Object.entries(obj).sort(sort_ids));
                }, {});
            arr.push(filtered)
            }
            return arr.sort((a,b) => a.id - b.id);
        }, []).map((e,i,arr) => {
            // Replace pseudo parents with real
            if(e.parent > arr.length) e.parent = pseudo_parents[e.parent];
            return e;
        });
    }
}
