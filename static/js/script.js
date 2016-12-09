$(function() {
    function activateElem(elemClass) {
        var arr = document.getElementsByClassName(elemClass);

        Array.prototype.forEach.call(arr, function(v, i) {

            var elem = v;
            var classes = elem.className;


            elem.addEventListener('mousedown', function() {
                this.className += ' ' + elemClass + '--active';
            });

            elem.addEventListener('mouseup', function() {
                this.className = classes;
                document.activeElement.blur();
            });

            elem.addEventListener('keydown', function(event) {
                if(event.keyCode == 13) {
                    this.className += ' ' + elemClass + '--active';
                }
            });

            elem.addEventListener('keyup', function() {
                this.className = classes;
            });
        });
    }

    activateElem('button');

    $('.breadcrumbs').on('click', '.breadcrumbs__item', function(event) {
        event.preventDefault();

        if($(this).hasClass('breadcrumbs__item--active')) {
            return;
        }
        else {
            $('.breadcrumbs__item').removeClass('breadcrumbs__item--active');
            $(this).addClass('breadcrumbs__item--active');
        }
    });

    //порефакторить этот ад ↓

    $('.pagination').on('click', '.pagination__item', function(event) {
        event.preventDefault();
        var active = $('.pagination__item--active');
        var control = $(this).attr('data-pagination');

        if($(this).hasClass('pagination__item--active')) {
            return;
        }
        else if(control) {
            if(active.next('.pagination__item').attr('data-pagination') === control || active.prev('.pagination__item').attr('data-pagination') === control) {
                $(this).blur();
                return;
            }
            else {
                active.removeClass('pagination__item--active');
                if(control === 'next') {
                    active.next('.pagination__item').addClass('pagination__item--active');
                }
                else {
                    active.prev('.pagination__item').addClass('pagination__item--active');
                }
            }
        }
        else {
            $('.pagination__item').removeClass('pagination__item--active');
            $(this).addClass('pagination__item--active');
        }
    });

    $('.select--hidden').selectmenu({
        appendTo: '.select',
        classes: {
            'ui-selectmenu-button': 'select__content',
            'ui-selectmenu-icon': 'select__arrows',
            'ui-selectmenu-text': 'select__text',
            'ui-selectmenu-menu': 'select__list'
        }
    });

    $('.alert__close').on('click', function() {
        $(this).closest('.alert').addClass('alert--closed');
    });

});
