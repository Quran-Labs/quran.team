import { Injectable } from '@angular/core';
import * as top from '../../assets/top.js';
import * as qaloon from '../../assets/qaloon.js';
import * as warsh from '../../assets/warsh.js';
import * as ibn_wardan from '../../assets/ibn_wardan.js';
import * as ibn_jumaz from '../../assets/ibn_jumaz.js';
import * as qonbol from '../../assets/qonbol.js';
import * as bazzy from '../../assets/bazzy.js';
import * as doory_amr from '../../assets/doory_amr.js';
import * as soosy from '../../assets/soosy.js';
import * as rawh from '../../assets/rawh.js';
import * as rowais from '../../assets/rowais.js';
import * as hafs from '../../assets/hafs.js';
import * as shoba from '../../assets/shoba.js';
import * as hisham from '../../assets/hisham.js';
import * as ibn_thakwan from '../../assets/ibn_thakwan.js';
import * as khalaf from '../../assets/khalaf.js';
import * as khallad from '../../assets/khallad.js';
import * as ishaq from '../../assets/ishaq.js';
import * as edrees from '../../assets/edrees.js';
import * as abo_elharith from '../../assets/abo_elharith.js';
import * as doory_kasaiy from '../../assets/doory_kasaiy.js';

@Injectable({
    providedIn: 'root',
})
export class DemoAppService {

    private config: any = [];

    constructor() {
        this.config = [{
            container: '#basic-popover',
            animateOnInit: true,
    
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
                return this.config.concat(qaloon.default);
            case 'ورش':
                return this.config.concat(warsh.default);
            case 'ابن_وردان':
                return this.config.concat(ibn_wardan.default);
            case 'ابن_جماز':
                return this.config.concat(ibn_jumaz.default);
            case 'قنبل':
                return this.config.concat(qonbol.default);
            case 'البزي':
                return this.config.concat(bazzy.default);
            case 'الدوري':
                return this.config.concat(doory_amr.default);
            case 'السوسي':
                return this.config.concat(soosy.default);
            case 'روح':
                return this.config.concat(rawh.default);                                    
            case 'رويس':
                return this.config.concat(rowais.default);
            case 'حفص':
                return this.config.concat(hafs.default);
            case 'شعبة':
                return this.config.concat(shoba.default);
            case 'هشام':
                return this.config.concat(hisham.default);
            case 'ابن_ذكوان':
                return this.config.concat(ibn_thakwan.default);
            case 'خلف':
                return this.config.concat(khalaf.default);
            case 'خلاد':
                return this.config.concat(khallad.default);
            case 'إسحاق':
                return this.config.concat(ishaq.default);
            case 'إدريس':
                return this.config.concat(edrees.default);  
            case 'أبو_الحارث':
                return this.config.concat(abo_elharith.default);
            case 'الـدوري':
                return this.config.concat(doory_kasaiy.default); //
            default:
                return this.config.concat(top.default);
        }
    }
}
