let maxdate = new Date(); 
maxdate.setDate(maxdate.getDate() + 90); //3 months

new AirDatepicker('#date-static', {
    autoClose: true,
    minDate: new Date(),
    maxDate: maxdate,
    // onRenderCell({date, cellType}) {
    //     var disabledDays = [0, 6];
    //     if (cellType === 'day') {
    //         var day = date.getDay(),
    //             isDisabled = disabledDays.indexOf(day) != -1;

    //             return {
    //                 disabled: isDisabled
    //             }
    //     }
    // },
    onSelect({date, formattedDate, datepicker}) {
        datepicker.$el.classList.add('changed');
    }
});

let dpMin, dpMax;

dpMin = new AirDatepicker('#date-begin', {
    autoClose: true,
    onSelect({date, datepicker}) {
        datepicker.$el.classList.add('changed');
        dpMax.update({
            minDate: date
        })
    }
})

dpMax = new AirDatepicker('#date-end', {
    autoClose: true,
    onSelect({date, datepicker}) {
        datepicker.$el.classList.add('changed');
        dpMin.update({
            maxDate: date
        })
    }
})