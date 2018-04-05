
$(function() {
    var tabs = $('#features > nav a');
    var tabsContent = $('#features > article > section');
    
    tabs.click(function(e) {
        e.preventDefault();
        
    var that = $(this);
        
    tabs.removeClass('is-selected');
    that.addClass('is-selected');
    tabsContent.removeClass('is-selected');
        
    tabsContent
    .filter((i, tab) => $(tab).data('id') === that.data('id'))
    .addClass('is-selected');
            });
    });
    

//
//$(function() {
//    //dla każdego kontenera z treścią tabów dodajemy klasę js -> patrz dalej
//    
//    $('.tabs').each(function() {
//     const $a = $(this).find('a'); // pobieram wszystkie linki-zakładki
//    
//    //po kliknięciu na link...
//    $a.on('click', function(e) {
//        //podstawiamy pod zmienną $this kliknięty link
//        const $this = $(this);
//        
//        //pobieramy href klikniętego linka
//        const href = $this.attr('href');
//        //pobieramy treść na którą wskazuje link
//        const $target = $(href);
//        
//        //jeżeli ta treść w ogóle istnieje...
//        if ($target.lenght) {
//            e.preventDefault(); // przerwij domyślną czynność jezeli istnieje zawartosc zakładki
//            
//        // usuwamy z sasiednich linków klasę is-selected
//        $this.siblings('a').removeClass('.is-selected');
//            //kliknietemu linkowi dajemy klasę is-selected
//        $this.addClass('.is-selected');
//        }
//    });
//});
//});


//$(function() {
//   $('.column').on('click', function() {
//     
//     var panelToShow = $(this).attr('rel');
//       alert(panelToShow);
//     
//     });
//    
//});
    
    
    