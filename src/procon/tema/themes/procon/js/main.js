(function($) {
  $(document).ready(function() {
    //MENU HOVER
    $(".menu .subMenu a").mouseenter(function () {
        $(this).parent().find('ul.menuNivel').show();
        $(this).addClass('active');
    });
    $(".menu .subMenu").mouseleave(function () {
        $(this).parent().find('ul.menuNivel').hide();
        $(this).removeClass('active');
     });

    //ACCORDEON
    $('.divAccordeon .textoAccordeon').hide();
    $('.divAccordeon h3').click(function(){
        $(this).toggleClass('active');
        $(this).next().slideToggle();
    });

    //categorias CONSUMIDOR.GOV
    $.ajax({
      url: portal_url + '/consumidorjson',
      dataType: 'json',
      type: 'post',
      success:function(data){
        var projects = [
           {
             categoria: "jquery",
             label: "jQuery",
             desc: "the write less, do more, JavaScript library",
             icon: "jquery_32x32.png"
           },
           {
             categoria: "jquery-ui",
             label: "jQuery UI",
             desc: "the official user interface library for jQuery",
             icon: "jqueryui_32x32.png"
           },
           {
             categoria: "sizzlejs",
             label: "Sizzle JS",
             desc: "a pure-JavaScript CSS selector engine",
             icon: "sizzlejs_32x32.png"
           }
         ];
        var data_filtered = [];
        $.each(data,function(key,value){

          data_filtered.push({'label': value.titulo, 'desc':value.categoria, 'url':value.url});
        });
        console.log(data_filtered);
        $( "#project" ).autocomplete({
              minLength: 0,
              source: data_filtered,
              focus: function( event, ui ) {
                $( "#project" ).val( ui.item.label );
                return false;
              },
              select: function( event, ui ) {
                $( "#project" ).val( ui.item.label );
                $( "#project-id" ).val( ui.item.url );
                // $( "#project-description" ).html( ui.item.desc );
                // $( "#project-icon" ).attr( "src", "images/" + ui.item.icon );
                return false;
              }
        })
        .autocomplete( "instance" )._renderItem = function( ul, item ) {
          return $( "<li>" )
            .append( "<a href='"+item.url+"' target='_blank'><b>" + item.label + "</b><br>" + item.desc + "</a>" )
            .appendTo( ul );
        };

       }
    });

    // Cria os Cookies
        if ($.cookie('contraste1') === "true") {
            $('body').addClass('contraste1');
        }

        if ($.cookie('contraste2') === "true") {
            $('body').addClass('contraste2');
        }
        if ($.cookie('resetCookie') === "true") {
            $('body').removeClass('contraste1');
            $('body').removeClass('contraste2');
        }
        if ($.cookie('librasCookie') === "ativo") {
            $('a.btn-libras').attr('id','ativo');
            $('.contEsq .divLibras').addClass('abrevideo');
            $('a.btn-libras').addClass('ativo');
        }else{
            $('.contEsq .divLibras').removeClass('abrevideo');
            $('a.btn-libras').removeClass('ativo');
            $('a.btn-libras').attr('id','');
        }

        $(".fontResizer_add").click(function () {
            maisFont();
        });
        $(".fontResizer_minus").click(function () {
            menosFont();
        });
        $(".fontResizer_reset").click(function () {
            resetFont();
        });
        (function(){
            var tam = $.cookie('tamanhoLetra');
            $('body').css("font-size",tam+"px");
            console.log("TAMANHO INICIAL",$.cookie('tamanhoLetra'));
        })();

        function maisFont(){
            var tamanho = $('body').css("font-size");
            var maisUm = parseInt(tamanho.substr(0, 2));
            maisUm++;
            $.cookie('tamanhoLetra', maisUm,{ path: '/' });
            $('body').css("font-size",maisUm+"px");
            console.log("MAiS",$.cookie('tamanhoLetra'));
        }
        function menosFont(){
            var tamanho = $('body').css("font-size");
            var maisUm = parseInt(tamanho.substr(0, 2));
            maisUm--;
            $.cookie('tamanhoLetra', maisUm,{ path: '/' });
            $('body').css("font-size",maisUm+"px");
        }
        function resetFont(){
            $('body').css("font-size","12px");

            $.removeCookie('contraste2', { path: '/' });
            $.removeCookie('contraste1', { path: '/' });

            if (!($.cookie('resetCookie') === "true")) {
                $('body').removeClass('contraste1');
                $('body').removeClass('contraste2');
                $.cookie('resetCookie','true',{path:'/'});

                $('.fontSize').removeAttr('style');
                $('.fontSize15').removeAttr('style');
                $.removeCookie('tamanhoLetra', { path: '/' });
            }
            else {
                $('.fontSize').removeAttr('style');
                $('.fontSize15').removeAttr('style');
                $.removeCookie('tamanhoLetra', { path: '/' });
                $.cookie('resetCookie','false',{path:'/'});
            }
        }

        // Acoes nos botoes de acessibilidade
        $(".btn-contraste1").click(function () {
            $.removeCookie('contraste2', { path: '/' });
            $.removeCookie('resetCookie', { path: '/' });
            if (!($.cookie('contraste1') === "true")) {
                $('body').removeClass('contraste2');
                $('body').addClass('contraste1');
                $.cookie('contraste1','true',{path:'/'});
            }
            else {
                $.cookie('contraste1','false',{path:'/'});
            }
            return false;
        });
        $(".btn-contraste2").click(function () {
            $.removeCookie('contraste1', { path: '/' });
            $.removeCookie('resetCookie', { path: '/' });
            if (!($.cookie('contraste2') === "true")) {
                $('body').removeClass('contraste1');
                $('body').addClass('contraste2');
                $.cookie('contraste2','true',{path:'/'});
            }
            else {
                $.cookie('contraste2','false',{path:'/'});
            }
            return false;
        });
        $(".btn-libras").click(function () {
            if($(this).attr('id')=='ativo'){
                $('.contEsq .divLibras').removeClass('abrevideo');
                $('a.btn-libras').removeClass('ativo');
                $('a.btn-libras').attr('id','');

            }else{
                $('a.btn-libras').attr('id','ativo');
                $('.contEsq .divLibras').addClass('abrevideo');
                $('a.btn-libras').addClass('ativo');
            }
            $.cookie('librasCookie',$(this).attr('id'),{ path: '/' });

        });
  })
})(jQuery);
