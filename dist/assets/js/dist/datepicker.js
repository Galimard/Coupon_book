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