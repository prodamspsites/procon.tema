(function($) {
  $(document).ready(function() {
    //LINK EM NOVA JANELA
        $(".contentBody a.external-link").each(function(e) {
            link_url = $(this).attr('href');
            if (link_url.indexOf(portal_url) != 0) {
                $(this).attr('target', '_blank')
            }
        });

    //MASCARA
           $("#data-de-nascimento").mask("99/99/9999");
           $("#data-da-compra-ou-assinatura-do-contrato").mask("99/99/9999");
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
    //TABLEADMIN ZEBRA
    $( ".tableReclamacoes table tr:odd" ).css( "background-color", "#f5f5f5" );
    //OCULTA FORMULARIO CONSUMIDOR

    if ($('body').hasClass('portaltype-formfolder') && $('body').hasClass('section-consumidor')) {
        empresa = $('#archetypes-fieldname-empresa');
        area = $('#archetypes-fieldname-area');
        data_compra = $('#archetypes-fieldname-data-da-compra-ou-assinatura-do-contrato');
        produto = $('#archetypes-fieldname-produto-ou-servico-contratado');
        btn_enviar = $('input[name=form_submit]');
        $(empresa, data_compra, produto, area).hide();

        tooltip_url = portal_url + '/consumidor/area';
        lightbox_url = portal_url + '/consumidor/termos-de-uso-e-politicas-de-privacidade';
        $.ajax({
            url: tooltip_url, success: function(tooltip) {
              tooltip = $(tooltip).find('.contentBody').html();
              $(area).append("<div class='divGeralTootltip'><a href='javascript:void(0);' class='btnTooltip'>?</a><div class='tooltip-area'>"+tooltip+"<a href='javascript:void(0);' class='fechaTooltip'>FECHAR</a></div></div>");
            }
        })

        $.ajax({
            url: lightbox_url, success: function(lightbox) {
              lightbox_titulo = $(lightbox).find('.titPage').html();
              lightbox_text = $(lightbox).find('.contentBody').html();
              $('body').append("<div class='lightboxGeral'><div class='lightbox-div'><h2>"+lightbox_titulo+"</h2><div class='divScrollLight'>"+lightbox_text+"</div><a href='javascript:void(0);' class='fechaLightbox'>FECHAR</a></div></div>");
              $(btn_enviar).before("<div class='contentLightbox'><input type='checkbox'>Concordo em disponibilizar as informações contidas em minha reclamação para que sejam divulgadas no site de acordo com os <a href='javascript:void(0);' class='linkLightbox'>Termos de Uso e Políticas de Privacidade.</a></div></div>");
            }
        })

        $(document).on('click','.linkLightbox', function(){
            $('.lightboxGeral').show();
        });
         $(document).on('click','.btnTooltip', function(){
            $('.tooltip-area').toggle();
        });
        $(document).on('click','.fechaLightbox', 'body',function(){
            $('.lightboxGeral').hide();
        });
        $(document).on('click','.fechaTooltip', function(){
            $('.tooltip-area').hide();
        });

        var itensForm = $(".formDuvidas").detach();

        $('.form-group .btnBuscar').click(function(){
            $('#content #content-core').append(itensForm);
            $('.form-group').addClass('active');
            $('.divRedireciona').slideUp();

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
            });

        });

        $(document).on('change', 'input[type=radio][name=deseja-informar-a-empresa]', function(){
            if (this.value == 'Sim') {
                $(empresa, data_compra, produto, area).show();
                $('input', empresa, data_compra, produto, area).prop('required',true);
            }
            else if (this.value == 'Não') {
                $(empresa, data_compra, produto, area).hide();
                $('input', empresa, data_compra, produto, area).prop('required',false);
            }
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

        // DUVIDAS PERGUNTA
<<<<<<< HEAD
        $(document).on('change','body.template-duvidas_view input[type=radio][class=duvida_util]',function(){
            url = portal_url + '/@@duvidas_salvar';
=======
        $( 'body.template-duvidas_view input[type=radio][class=duvida_util]' ).change( function() {
>>>>>>> 37a2b6299cb97bf87e0551435f0962b9cf458496
            var util = $(this).val();
            var parent_div = $(this).parent().parent().parent().parent().parent();
            var plone_id = $("h3",parent_div).data('id');
            var pergunta = $("h3",parent_div).text();
<<<<<<< HEAD
            var usuario = $("#form_usuario_duvida",parent_div).val()
            console.log(usuario);
            var resposta = $(".textoAccordeon span.resposta_duvida",parent_div).text();

=======
            var resposta = $(".textoAccordeon span.resposta_duvida",parent_div).text();
>>>>>>> 37a2b6299cb97bf87e0551435f0962b9cf458496
            if(util == 'sim'){
              util = true
            }else{
              util = false;
            }
<<<<<<< HEAD

            if (this.value == 'sim') {
              $(".replica").hide();
              $.post( url,
              {
                  util: util,
                  plone_id: plone_id,
                  pergunta: pergunta,
                  resposta: resposta,
                  usuario:usuario
              })
            }
            else if (this.value == 'nao') {
              $(".replica").show();
              $(document).on('click', "#enviarDuvida", function(e){
                e.preventDefault();
                var assunto = $("#assunto_opcao option:selected",parent_div).val();
                var mensagem = $("textarea",parent_div).val();
                $.post( url,
                {
                      util: util,
                      plone_id: plone_id,
                      pergunta: pergunta,
                      resposta: resposta,
                      assunto: assunto,
                      mensagem: mensagem,
                      usuario:usuario
                })
              });
            }
=======
            var assunto = $("select option:selected",parent_div).val();
            var mensagem = $("textarea",parent_div).val();

            url = portal_url + '/@@pergunta';
            $.post( url,
            {
                util: util,
                plone_id: plone_id,
                pergunta: pergunta,
                resposta: resposta,
                assunto: assunto,
                mensagem: mensagem
            })

>>>>>>> 37a2b6299cb97bf87e0551435f0962b9cf458496
        })

  })
})(jQuery);
