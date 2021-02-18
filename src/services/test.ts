import {
    APIARRAY
} from "./achivements_array";

import a from "./achievmentsOrdered.json"

export class Test {
    tranformArrays() {
        const array = APIARRAY;

        const newObjectArray: Array<any> = [];

        const obj65 = {
            api_label: "KILL_ENEMY_P250",
            number: 66,
            "label": "P250 Expert"
        };

        const obj82 = {
            number: 83,
            api_label: "DOMINATION_OVERKILLS_MATCH",
            "label": "Ten Angry Men"
        };
            
        APIARRAY.map((element) => {
            if (element.number) {
                if (element.number < 65) {
                    newObjectArray.push(element)
                    return;
                }
                if (element.number === 65) {
                    newObjectArray.push(element)
                    newObjectArray.push(obj65)
                    return;
                }
                if (element.number > 65 && element.number < 82) {
                    const newElement = {
                        number: (element.number + 1),
                        api_label: element.api_label,
                        label: element.label,
                    };
                    newObjectArray.push(newElement);
                    return;
                }
                if (element.number === 82) {
                    newObjectArray.push(element)
                    newObjectArray.push(obj82)
                    return;
                };
                if (element.number > 82) {
                    const newElement = {
                        number: (element.number + 2),
                        api_label: element.api_label,
                        label: element.label,
                    };
                    newObjectArray.push(newElement);
                }
            }
  
        });

        const orderArray = newObjectArray.sort((a, b) => a.number - b.number);
        orderArray.unshift({
            "api_label": "GIVE_DAMAGE_LOW",
            "label": "Points in Your Favor",
            number: 0,
        });

        return orderArray;

    }

    notNumber() {
        // const array = this.tranformArrays();

        // const obj = {
        //     number: 83,
        //     api_label: "DOMINATION_OVERKILLS_MATCH",
        //     "label": "Ten Angry Men"
        // };

        // const founds: Array<any> = [];

        // const found = array.some(el => {
        //     if (el.api_label === obj.api_label) {
        //         founds.push(el)
        //     }
        // }); 

        // console.log(founds);

        console.log(a)
    }
}