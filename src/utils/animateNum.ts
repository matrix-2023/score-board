
export function AnimateNumber(this: any, selector: string, settings: object) {

    this.settings = Object.assign({
        digits: 5,
        delay: 200, // ms
        direction: ''  // ltr is default
    }, settings || {});

    var scopeElm: any = document.querySelectorAll(selector);

    scopeElm.forEach((counter: any) => {
        // generate digits markup
        var digitsHTML = Array(counter.dataset.value.length + 1).join('<div><b data-value="0"></b></div>')
        counter.innerHTML = digitsHTML;

        // console.log({ c: counter.dataset.value, scopeElm, settings, digitsHTML }, 'scopeElm');

        this.DOM = {
            scope: counter,
            digits: counter.querySelectorAll('b')
        }

        this.DOM.scope.addEventListener('transitionend', (e: any) => {
            if (e.pseudoElement === "::before" && e.propertyName == 'margin-top') {
                e.target.classList.remove('blur')
            }
        })

        this.UpdateClass();
    });
}

AnimateNumber.prototype.UpdateClass = function (newVal: number) {
    // console.log(newVal, this.DOM, 'proto');

    var countTo: any[],
        settings = this.settings,
        digitsElms = this.DOM.digits;

    // update instance's value
    this.value = newVal | this.DOM.scope.dataset.value | 0

    if (!this.value) return;

    // convert value into an array of numbers
    countTo = (this.value + '').split('')

    if (settings.direction == 'rtl') {
        countTo = countTo
        digitsElms = [].slice.call(digitsElms)
    }

    // console.log({ countTo, aio: this, digitsElms }, 'CounFun');


    // loop on each number element and change it
    digitsElms.forEach(function (item: { dataset: { value: string | number; }; className: string; }, i: number) {
        if (+item.dataset.value != countTo[i] && countTo[i] >= 0)
            setTimeout(function (j) {
                var diff = Math.abs(countTo[j] - +item.dataset.value);
                item.dataset.value = countTo[j]
                if (diff > 3)
                    item.className = 'blur';
            }, i * settings.delay, i)
    })
}