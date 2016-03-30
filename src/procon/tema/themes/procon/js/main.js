(function($) {
  $(document).ready(function() {
    //MASCARA
           $("#data-de-nascimento").mask("99/99/9999");
           $("data-da-compra-ou-assinatura-do-contrato").mask("99/99/9999");
           $("#telefone").mask("(99) 9999-9999");
           $("#cep").mask("99999-999");
           $("#cpf").mask("999.999.999-99");
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

    //OCULTA FORMULARIO CONSUMIDOR

    if ($('body').hasClass('portaltype-formfolder') && $('body').hasClass('section-consumidor')) {
        empresa = $('#archetypes-fieldname-empresa');
        data_compra = $('#archetypes-fieldname-data-da-compra-ou-assinatura-do-contrato');
        produto = $('#archetypes-fieldname-produto-ou-servico-contratado');
        $(empresa, data_compra, produto).hide();
        var itensForm = $(".formDuvidas").detach();

        $('.form-group .btnBuscar').click(function(){
            $('#content #content-core').append(itensForm);
            $('.form-group').addClass('active');
            $('.divRedireciona').slideUp();
        });

        $(document).on('change', 'input[type=radio][name=deseja-informar-a-empresa]', function(){
            if (this.value == 'Sim') {
                $(empresa, data_compra, produto).show();
                $('input', empresa, data_compra, produto).prop('required',true);
            }
            else if (this.value == 'Não') {
                $(empresa, data_compra, produto).hide();
                $('input', empresa, data_compra, produto).prop('required',false);
            }
        })

        tooltip_url = portal_url + '/consumidor/area';
        lightbox_url = portal_url + '/consumidor/termos-de-uso-e-politicas-de-privacidade';
        $.ajax({
            url: tooltip_url, success: function(tooltip) {
              tooltip = $(tooltip).find('.contentBody');
            }
        })

        $.ajax({
            url: lightbox_url, success: function(lightbox) {
              lightbox_titulo = $(lightbox).find('.subTitNoticias');
              lightbox_text = $(lightbox).find('.contentBody');
            }
        })


        //upload plone form gen
        var file = $("input:file");
        $.each(file,function(value){
          if( value > 0 ){
             $("#"+file[value].id).parent().parent().hide();
          }
        });

        $("input[type='file']").on('change',function(){
            var id  = $(this).attr('id');
            console.log(id);
            $("#"+id).parent().parent().next().show();
            var nomeArquivo = this.files[0].name;
            var tamanhoArquivo = this.files[0].size;
            $("#"+id).after('<a href="#" class="clearImage">Clear</a><br><span style="margin-top:20px;width:600px;height:400px; padding:5px">Nome:'+nomeArquivo+'<br>Tamanho:'+formatar(tamanhoArquivo)+'</spam>');
        });

        //formata tamanho do arquivo upload
        var formatar = function formatBytes(bytes,decimals) {
           if(bytes == 0) return '0 Byte';
           var k = 1000;
           var dm = decimals + 1 || 2;
           var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
           var i = Math.floor(Math.log(bytes) / Math.log(k));
           return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        };

        $(document).on('click', '.clearImage', function(e) {
          e.preventDefault();
          thisParent = $(this).parent()
          input = $('input', thisParent);
          $(input).val('');
          $(this).remove();
          $('span',thisParent).remove();
          return false;
        })
    }



    //categorias CONSUMIDOR.GOV
    $.ajax({
      url: portal_url + '/consumidorjson',
      dataType: 'json',
      type: 'post',
      success:function(data){

        var data_filtered = [];
        $.each(data,function(key,value){

          data_filtered.push({'label': value.titulo, 'desc':value.categoria, 'url':value.url});
        });
        $( "#project" ).autocomplete({
              minLength: 0,
              source: data_filtered,
              focus: function( event, ui ) {
                $( "#project" ).val( ui.item.label );
                return false;
              },
              close: function(event, ui){
                $('.form-group .btnBuscar').removeClass('disabled');
                $('.form-group .btnBuscar').attr('disabled', false);
              },
              select: function( event, ui ) {
                $( "#project" ).val( ui.item.label );
                $( "#project-id" ).val( ui.item.url );
                // $( "#project-description" ).html( ui.item.desc );
                // $( "#project-icon" ).attr( "src", "images/" + ui.item.icon );

                //CAPTURA LINK CLICK AUTOCOMPLETE
                urlEmpresa = $( "#project-id" ).val();

                $('.linkRedireciona').attr('href', urlEmpresa);
                $('.divRedireciona').slideUp();
                $('.divRedireciona').slideDown();
                $('.form-group .btnBuscar').hide();

                $('.form-group').addClass('active');
                var itensForm = $(".formDuvidas").detach();
                return false;
              },
              open: function(event, ui){
                $('.form-group .btnBuscar').addClass('disabled');
                $('.form-group .btnBuscar').attr('disabled', true);
                $('.form-group .btnBuscar').show();
              }
        })
        .autocomplete( "instance" )._renderItem = function( ul, item ) {
          return $( "<li>" )
            .append( "<a href='javascript:void(0);' title='"+item.label+"'><b>" + item.label + "</b><br>" + item.desc + "</a>" )
            .appendTo( ul );
        };
        $.ui.autocomplete.filter = function (array, term) {
          var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
          return $.grep(data_filtered, function (value) {
            return matcher.test(value.label || value.value || value);
          });
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
        })();

        function maisFont(){
            var tamanho = $('body').css("font-size");
            var maisUm = parseInt(tamanho.substr(0, 2));
            maisUm++;
            $.cookie('tamanhoLetra', maisUm,{ path: '/' });
            $('body').css("font-size",maisUm+"px");
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
