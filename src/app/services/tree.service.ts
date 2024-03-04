import { Injectable } from '@angular/core';
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
export class DemoAppService {

    private config: any = [];

    constructor() {
        this.config = [{
            container: '#basic-popover',
            scrollbar: "None",
            node: {
                collapsable: true,
            },
            animation: {
                nodeAnimation: 'easeOutBounce',
                nodeSpeed: 700,
                connectorsAnimation: 'bounce',
                connectorsSpeed: 700,
            },
        }];
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
    getAssetFile(tree_name: any) {
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
    stripBeforeUpload(nodes=[]):[any] {
        const allowed = ['text', 'name', 'data_id', 'parentId', 'nodeHTMLclass', 
                        'pseudo', 'image', 'uncles', 'childrenDropLevel',
                        'place', 'contact', 'date'];
        const dict = {
            "data_id": "id",
            "parentId": "parent",
            "nodeHTMLclass": "HTMLclass"
          };
        var sort_ids = function(a,b){
            if(a[0] == "id") return -1;
            if(b[0] == "id") return  1;
            if(a[0] == "parent") return -1;
            if(b[0] == "parent") return  1;
            if(a[0] == "text") return -1;
            if(b[0] == "text") return  1;
            return a[0].localeCompare(b[0]);
        }
        return nodes.filter(e => typeof e != 'string').reduce((arr, current) => {
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
                    return Object.fromEntries(Object.entries(obj).sort(sort_ids));
                }, {});
            arr.push(filtered)
            return arr.sort((a,b) => a.id - b.id);
        }, [])
    }
}
