(function($) {
  $(document).ready(function() {
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
           return null;
        }
        else{
           return results[1] || 0;
        }
    }


    $(document).on('click', '.fileDownload', function(e) {
      e.preventDefault()
      mimetype = $(this).data('mimetype');
      binary = $(this).data('binary');
      filename = $(this).text();
      link = document.createElement('a');
      if (typeof link.download === 'string') {
        link.href = 'data:'+mimetype+';base64,'+binary;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);
        }
        return false;
      })



    var currentUser = $('.currentUser').text();

    //TEMPLATE BUSCAR_DUVIDAS
    if ($('body').hasClass('template-buscar_duvidas') || $('body').hasClass('template-buscar_reclamacoes') || $('body').hasClass('template-buscar_denuncias') || $('body').hasClass('template-buscar_fornecedores')) {
      var currentUser = $('.currentUser').text();
      $('#portal-header nav.menu ul').html('<li><a href="'+portal_url+'/buscar_reclamacoes">Reclamações</a></li><li><a href="'+portal_url+'/buscar_duvidas">Dúvidas</a></li><li><a href="'+portal_url+'/buscar_denuncias">Denúncias</a></li><li><a href="'+portal_url+'/buscar_fornecedores">Fornecedores</a></li>')
      $('#portal-header').append('<div class="wrap" style="position:relative"><div class="loginAdmin"><span class="nome">'+currentUser+'</span> <a href="'+portal_url+'/logout" title="sair" class="btnSair">Sair</a></div></div>');
      $('.wrap .loginAdmin').show();
    }

    $(document).on('click','.btnupload', function(){
        $(this).parent().parent().find('input').trigger('click');
    });
    $(document).on('click','.clearImage', function(){
      contaUploads = contaUploads - 1;
      $('#archetypes-fieldname-filenumber input').val(contaUploads);
    });

    var contaUploads = '';
    function insereInputFile() {
        //upload plone form gen
          var file = $("input:file").css('display', 'none');
          $.each(file,function(value){
            if( value > 0 ){
               $("#"+file[value].id).parent().parent().hide();
            }
          });
          if(!$('.botaoUpload').size()){
            $("input:file").before('<div class="botaoUpload"><a class="btnupload">ANEXAR ARQUIVO(S)</a><p class="infoUpload">Somente arquivos com extensões JPG, PNG ou PDF<br />Até 5 arquivos, com até 20 MB de tamanho.</p></div>');
          }
          $("input[type='file']").on('change',function(){
              var id  = $(this).attr('id');
              console.log(id);
              $("#"+id).parent().parent().next().show();
              var nomeArquivo = this.files[0].name;
              var tamanhoArquivo = this.files[0].size;
              $("#"+id).after('<div class="divDadosUpload"><span class="nomeArq">'+nomeArquivo+'</span>'+'<span class="tamanhoArq">'+formatar(tamanhoArquivo)+'</span><a href="#" class="clearImage">REMOVER ARQUIVO</a></div>');

              contaUploads = $('.divDadosUpload .clearImage').length;
              $('#archetypes-fieldname-filenumber input').val(contaUploads);
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
    }
    //$(document).on('click','.btnupload', function(){
        //$(this).parent().parent().find('input').trigger('click');
        //console.log($('.divDadosUpload .clearImage').length);
    //});

    //AJUSTE NO TEMPLATE DE CADASTRO
    if ($('body').hasClass('template-register')) {
      form = $('.kssattr-formname-register')
      $('#form-widgets-tipo-0').prop('checked', true);
      municipio = $('.kssattr-fieldname-form\\.widgets\\.municipio').clone();
      tipo = $('.kssattr-fieldname-form\\.widgets\\.tipo').clone();
      nome = $('.kssattr-fieldname-form\\.widgets\\.fullname').clone();
      user = $('.kssattr-fieldname-form\\.widgets\\.username').clone();
      cpf = $('.kssattr-fieldname-form\\.widgets\\.cpf').clone();
      cnpj = $('.kssattr-fieldname-form\\.widgets\\.cpf').clone();
      $('label', cnpj).text('CNPJ');
      tipo_societario = $('.kssattr-fieldname-form\\.widgets\\.tipo_societario')
      enquadramento = $('.kssattr-fieldname-form\\.widgets\\.enquadramento')
      cpf_pj = $('.kssattr-fieldname-form\\.widgets\\.cpf').clone();
      $('label', cpf_pj).text('CPF do representante').clone();
      rg_pj = $('.kssattr-fieldname-form\\.widgets\\.rg').clone();
      $('label', rg_pj).text('RG do representante').clone();
      site = $('.kssattr-fieldname-form\\.widgets\\.site').clone();
      uf = $('.kssattr-fieldname-form\\.widgets\\.unidade_federativa').clone();
      cidade = $('.kssattr-fieldname-form\\.widgets\\.cidade').clone();
      bairro = $('.kssattr-fieldname-form\\.widgets\\.bairro').clone();
      complemento = $('.kssattr-fieldname-form\\.widgets\\.complemento').clone();
      logradouro = $('.kssattr-fieldname-form\\.widgets\\.logradouro').clone();
      cep = $('.kssattr-fieldname-form\\.widgets\\.codigo_enderecamento_postal').clone();
      telefone = $('.kssattr-fieldname-form\\.widgets\\.contato_telefone').clone();
      expeditor = $('.kssattr-fieldname-form\\.widgets\\.expeditor').clone();
      rg = $('.kssattr-fieldname-form\\.widgets\\.rg').clone();
      genero = $('.kssattr-fieldname-form\\.widgets\\.genero').clone();
      email = $('.kssattr-fieldname-form\\.widgets\\.email').clone();
      email_confirmacao = $('.kssattr-fieldname-form\\.widgets\\.confirmacao').clone();
      senha = $('.kssattr-fieldname-form\\.widgets\\.password').clone();
      senha_confirmacao = $('.kssattr-fieldname-form\\.widgets\\.password_ctl').clone();
      razao_social = $('.kssattr-fieldname-form\\.widgets\\.razao_social').clone();
      nome_fantasia = $('.kssattr-fieldname-form\\.widgets\\.nome_fantasia').clone();
      responsavel = $('.kssattr-fieldname-form\\.widgets\\.responsavel').clone();
      estado_civil = $('.kssattr-fieldname-form\\.widgets\\.estadocivil').clone();
      nascimento = $('.kssattr-fieldname-form\\.widgets\\.data_nascimento').clone();
      celular = $('.kssattr-fieldname-form\\.widgets\\.contato_celular').clone();
      enviar = $('.formControls').clone();

      pf = $(form).clone();
      pj = $(form).clone();
      $('div', pf).remove();
      $('div', pj).remove();
      console.log($(cidade).html())
      form.html( $(pj).append($(municipio).html()).html()).show()
      pj = $(pf).clone();
      $(pf).prepend($(municipio).html() + $(tipo).html() + $(user).html() + $(cpf).html() + $(rg).html() + $(expeditor).html() +
                    $(nome).html() + $(genero).html() + $(estado_civil).html() + $(nascimento).html() +
                    '<div class="formQuestion label">Dados de contato<span class="formHelp"' +
                    'id="dados-de-contato-juridico_help"></span></div>' +
                    $(telefone).html() + $(celular).html() + $(cep).html() + 
                    $(logradouro).html() + $(complemento).html() + $(bairro).html() +
                    $(cidade).html() + $(uf).html() + $(email).html() + $(email_confirmacao).html() +
                    $(senha).html() + $(senha_confirmacao).html() + $(enviar).html() 
                   );
      $(municipio, pj).remove()
      $(cpf, pf).find('input').mask("999.999.999-99");
      $(pj).prepend($(municipio).html() + $(tipo).html() + $(user).html() + $(razao_social).html() + $(nome_fantasia).html() + 
                    $(tipo_societario).html() + $(enquadramento).html() + $(responsavel).html() +
                    $(cpf_pj).html() + $(rg_pj).html() + $(expeditor).html() +
                    '<div class="formQuestion label">Dados de contato<span class="formHelp"' +
                    'id="dados-de-contato-juridico_help"></span></div>' +
                    $(telefone).html() + $(cep).html() + $(logradouro).html() + 
                    $(complemento).html() + $(bairro).html() + $(cidade).html() +
                    $(uf).html() + $(site).html() + $(email).html() + $(email_confirmacao).html() +
                    $(senha).html() + $(senha_confirmacao).html() + $(enviar).html()
                   );
      $(document).on('click', '#form-widgets-tipo-0', function(){
        form.html($(pf).html()).show()
        mascarasForms();
        $('#form-widgets-tipo-0').prop('checked', true);
        $('#content .rowlike select').find('option:first-child').remove();
        $('#form-widgets-municipio-0').attr('checked', 'checked');
        $('#form-widgets-cidade').val('São Paulo');
        $('#form-widgets-unidade_federativa').val('SP');
      });

      $(document).on('click', '#form-widgets-tipo-1', function(){
        form.html($(pj).html()).show()
        mascarasForms();
        $('#form-widgets-tipo-1').prop('checked', true);
        $('#content .rowlike select').find('option:first-child').remove();
        $('#form-widgets-municipio-0').attr('checked', 'checked');
        $('#form-widgets-cidade').val('São Paulo');
        $('#form-widgets-unidade_federativa').val('SP');
      });

      $('#content-core').append('<form class="enableAutoFocus formCadastre" method="post" id="login_form" action="'+portal_url+'/login_form"><div id="login-form"><input type="hidden" name="came_from" value=""><input type="hidden" name="next"><input type="hidden" name="ajax_load"><input type="hidden" name="ajax_include_head"><input type="hidden" name="target"><input type="hidden" name="mail_password_url"><input type="hidden" name="join_url"><input type="hidden" name="form.submitted" value="1"><input type="hidden" name="js_enabled" id="js_enabled" value="0"><input type="hidden" name="cookies_enabled" id="cookies_enabled" value=""><input type="hidden" name="login_name" id="login_name" value=""><input type="hidden" name="pwd_empty" id="pwd_empty" value="0"><div class="divLoginCadastre"><h2>Faça seu login</h2><p>Faça seu login para realizar sua reclamação:</p><div class="field"><label for="__ac_name">Usuário :</label><input type="text" size="40" name="__ac_name" id="__ac_name" value=""></div><div class="field"><label for="__ac_password">Senha :</label><input type="password" size="40" name="__ac_password" id="__ac_password"></div><div id="login-forgotten-password"><p class="discreet"><span><a href="'+portal_url+'/Procon/mail_password_form?userid=">Esqueci minha senha</a></span>.</p></div><div class="formControls"><input class="context" type="submit" name="submit" value="ENTRAR"></div></div></form></div>')

      $(document).on('click', '#form-widgets-municipio-0', function(){
        form.html($(pf).html()).show()
        mascarasForms();
        $('#form-widgets-municipio-0').prop('checked', true);
        $('#content-core .rowlike').find('.proconSPmessage').hide();
        $('#content .rowlike select').find('option:first-child').remove();
        $('#form-widgets-tipo-0').attr('checked', 'checked');
        $('#form-widgets-cidade').val('São Paulo');
        $('#form-widgets-unidade_federativa').val('SP');
      });

      $(document).on('click', '#form-widgets-municipio-1', function(){
        form.html($(municipio).html()).show()
        $('#form-widgets-municipio-1').prop('checked', true);
        $('#content-core .rowlike').append('<p class="proconSPmessage">O PROCON Paulistano tem como atribuição atender os consumidores domiciliados no Município de São Paulo.</strong><br><br>Se você possui domicílio em outra cidade, procure o órgão de proteção e defesa do consumidor de sua localidade.</p>')
      });
      $("form.kssattr-formname-register").submit(function( event ) {
        $(".kssattr-formname-register input:text").not('#form-widgets-data_nascimento, #form-widgets-contato_celular, #form-widgets-site, #form-widgets-nome_fantasia').each(function(){
          if($(this).val() === ''){
            $('.kssattr-formname-register input:text').removeClass('error');
            $(this).addClass('error');
            $('html,body').animate({ scrollTop: $('.error').offset().top - 40}, 'slow');
            event.preventDefault();
            return false;
          }
        });
      });
      $(document).on('click', '#form-buttons-register', function() {
        newUrl = window.location.href + '?envio=True';
        window.history.pushState("", "", newUrl);
      })
      hasErrors = $('dl').hasClass('error');
      if (hasErrors) {
         $('dl.portalMessage.error').remove()
         $("#form-widgets-municipio-0").trigger("click");
         $('.fieldErrorBox .error').text('Preencha este campo corretamente.');
      }

    }

    //LINK EM NOVA JANELA
        $(".contentBody a.external-link").each(function(e) {
            link_url = $(this).attr('href');
            if (link_url.indexOf(portal_url) != 0) {
                $(this).attr('target', '_blank')
            }
        });
    //MENU RESP
     var desativaLnkMenu = false;
     $('.btnMenuResp').bind('click', function() {
         $(this).toggleClass('active');
         $('#portal-header nav.menu').slideToggle();
         $('#portal-header .divBusca').toggle();
         desativaLnkMenu = true;
         if (desativaLnkMenu == true){
             $('.subMenu > a').bind('click', function() {
                 $(this).parent().find('.menuNivel').slideToggle();
                 $(this).parent().toggleClass('active');
                 return false;
             });
        }
    });

    //MASCARA
           function mascarasForms(){
           $("#data-de-nascimento, #form-widgets-data_nascimento").mask("99/99/9999");
           $("#data-de-compra-ou-assinatura-do-contrato").mask("99/99/9999");
           $("#quando-voce-comprou-o-produto-ou-contratou-o-servico-1").mask("99/99/9999");
           $("#qual-o-valor-total-do-produto-servico-clique-ou-toque-aqui-para-inserir-o-texto-1").maskMoney({showSymbol:true, symbol:"R$", decimal:",", thousands:"."});
           $("#valor-da-parcela-clique-ou-toque-aqui-para-inserir-o-texto").maskMoney({showSymbol:true, symbol:"R$", decimal:",", thousands:"."});
           $("#quando-o-produto-ou-servico-apresentou-problema").mask("99/99/9999");
           $("#data-da-compra-ou-assinatura-do-contrato").mask("99/99/9999");
           $("#telefone, #form-widgets-contato_telefone").mask("(99) 9999-99999");
           $("#telefone, #form-widgets-contato_telefone, #form-widgets-contato_celular").mask("(99) 9999-99999");
           $("#cep, #form-widgets-codigo_enderecamento_postal, #cep-juridico").mask("99999-999");
           $("#cpf, #form-widgets-cpf").mask("999.999.999-99");
           $("#cnpj").mask("99.999.999/9999-99");
           $('.divRedireciona .inputProtocolo').mask("9999.99/99999999999");
           $('#quantidade-de-parcelas-clique-ou-toque-aqui-para-inserir-o-texto').keyup(function () { 
              this.value = this.value.replace(/[^0-9\.]/g,'');
          });
         }mascarasForms();
    //MENU HOVER
    if ($(window).width() >= 900){
             $(".menu .subMenu a").mouseenter(function () {
                 $(this).parent().find('ul.menuNivel').show();
                 $(this).addClass('active');
             });
             $(".menu .subMenu").mouseleave(function () {
                 $(this).parent().find('ul.menuNivel').hide();
                 $(this).removeClass('active');
             });
        }

    //ACCORDEON
    $('.divAccordeon .textoAccordeon').hide();
    $('.divAccordeon h3').click(function(){
        $(this).toggleClass('active');
        $(this).next().slideToggle();
    });
    //COMPARA DATAS
    $( "#quando-o-produto-ou-servico-apresentou-problema" ).focusout(function() {
        dataInicial = $('#quando-voce-comprou-o-produto-ou-contratou-o-servico-1').val();
        dataFinal = $('#quando-o-produto-ou-servico-apresentou-problema').val();
        compareDates(dataInicial,dataFinal);
    });
    $( "#quando-voce-comprou-o-produto-ou-contratou-o-servico-1" ).focusout(function() {
      if($('#quando-o-produto-ou-servico-apresentou-problema').val() != ''){
        alert('Este campo deve ser preenchido primeiro que a data do problema');
        $('#quando-o-produto-ou-servico-apresentou-problema').val('');
        $('#quando-voce-comprou-o-produto-ou-contratou-o-servico-1').val('');
      }
    });
    //TABLEADMIN ZEBRA
    $( ".tableReclamacoes table tr:odd" ).css( "background-color", "#f5f5f5" );

    //FORMULARIO DE DENUNCIA OCULTA ITENS
    $('#voce-procurou-a-empresa-para-solucionar-o-problema_1').click(function(){
      $('#pfg-fieldsetname-procurou-a-empresa-sim').show();
      $('#pfg-fieldsetname-procurou-a-empresa-nao').hide();
    });
    $('#voce-procurou-a-empresa-para-solucionar-o-problema_2').click(function(){
      $('#pfg-fieldsetname-procurou-a-empresa-sim').hide();
      $('#pfg-fieldsetname-procurou-a-empresa-nao').show();
    });

    //MASCARA CPF E CNPJ$(".inputAcesso.cpf").mask("999.999.999-99");
     $("#cnpj-cpf").attr('onkeypress','mascaraMutuario(this,cpfCnpj)');
     $("#cnpj-cpf").attr('onblur','clearTimeout()');

    $("#cnpj-cpf").focus(function(){
    try {
        $("#cnpj-cpf").unmask();
    } catch (e) {}
    });

   $("#cnpj-cpf").keydown(function(e){

        if ((e.keyCode < 96 && e.keyCode > 105)) {
            var tamanho = $("#cnpj-cpf").val().length;

            if(tamanho < 11){
                $("#cnpj-cpf").mask("999.999.999-99");
            } else if(tamanho >= 11){
                $("#cnpj-cpf").mask("99.999.999/9999-99");
            }
        }


    });

    //LIGHTBOX
    function lightboxForm() {
          lightbox_url = portal_url + '/termo-de-uso/termo';
          $.ajax({
              url: lightbox_url, success: function(lightbox) {
                lightbox_titulo = $(lightbox).find('.titPage').html();
                lightbox_text = $(lightbox).find('.contentBody').html();
                $('body').append("<div class='lightboxGeral'><div class='lightbox-div'><h2>"+lightbox_titulo+"</h2><div class='divScrollLight'>"+lightbox_text+"</div><a href='javascript:void(0);' class='fechaLightbox'>FECHAR</a></div></div>");
                if(!$('.contentLightbox').size()){
                   $('.usuario-ativo').before("<div class='contentLightbox'><input type='checkbox'>Concordo em disponibilizar as informações contidas em minha reclamação para que sejam divulgadas no site de acordo com os <a href='javascript:void(0);' class='linkLightbox'>Termos de Uso e Políticas de Privacidade.</a></div></div>");
                }
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
      }



    //OCULTA FORMULARIO CONSUMIDOR
    if (!($('body').hasClass('subsection-formularios'))){
      $('#viewlet-below-content-title .form-group').remove();
    }
    if ($('body').hasClass('portaltype-formfolder') && $('body').hasClass('subsection-formularios')) {
        var itensForm = $(".formDuvidas .pfg-form").detach();

        $('.form-group .btnBuscar, .btnProsseguir').click(function(){
            lightboxForm();
            $('#content #content-core').append(itensForm);
            $('.form-group').addClass('active');
            $('.divRedireciona').slideUp();
            $('#nome-da-empresa-fornecedor').val($('#project').val());
            if ($('body').hasClass('userrole-anonymous')) {
              $('#content').append('<div class="pfg-form formid-formularios"><div class="facaReclamaLogin"><strong>Cadastre-se ou faça login para prosseguir:<br><a href="'+portal_url+'/@@register" class="irparalogin" title="IR PARA CADASTRO/LOGIN">IR PARA CADASTRO/LOGIN</a></div></div>');
            }
            if(!$('.usuario-ativo').size()){
              $('<div class="usuario-ativo"><span>logado como: <strong>'+currentUser+'</strong> | <a href="'+portal_url+'/logout">sair</a></span></div>').insertBefore($("input[name='form_submit']"));
            }
            insereInputFile();
            //FORMULARIOS AREA SELECIONADA
            $('#archetypes-fieldname-especificar-comprou').hide();
            function escondeItens(){
              $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-alimentos').hide();
              $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-assuntos-financeiros').hide();
              $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-fiscalizacao').hide();
              $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-habitacao').hide();
              $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-produtos').hide();
              $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-saude').hide();
              $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-servicos-essenciais').hide();
              $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-servicos-privados').hide();
              $('#archetypes-fieldname-especificar-produto-servicos').hide();
              $('#archetypes-fieldname-especificar-problema-apresentado').hide();
            }
            escondeItens();
            $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-alimentos').show();

            $('#assinale-o-tipo-de-problema-apresentado-alimentos, #assinale-o-tipo-de-problema-apresentado-assuntos-financeiros, #assinale-o-tipo-de-problema-apresentado-fiscalizacao, #assinale-o-tipo-de-problema-apresentado-habitacao, #assinale-o-tipo-de-problema-apresentado-produtos, #assinale-o-tipo-de-problema-apresentado-saude, #assinale-o-tipo-de-problema-apresentado-servicos-essenciais, #assinale-o-tipo-de-problema-apresentado-servicos-privados').change(function(){
              if ($(this).val() == 'Outros'){
                $('#archetypes-fieldname-especificar-problema-apresentado').show();
              }
              else{
                $('#archetypes-fieldname-especificar-problema-apresentado').hide();
              }
            });

            $('#como-voce-comprou-contratou').change(function(){
              if ($(this).val() == 'Outros'){
                $('#archetypes-fieldname-especificar-comprou').show();
              }
              else{
                $('#archetypes-fieldname-especificar-comprou').hide();
              }
            });

            //VALIDA FORM RECLAMACAO
            $(".formid-formularios form").submit(function( event ) {
              if(!$('.clearImage').size()){
                $('.botaoUpload').css('border','1px solid red');
                event.preventDefault();
                return false;
              }
              else{
                $('.botaoUpload').css('border','none');
              }
              $(".formid-formularios form input:text, .formid-formularios form textarea").not('#complemento, #inscricao-estadual, #matricula-codigo, #especificar-comprou, #informe-como-foi-o-seu-contato-com-a-empresa-indique-o-s-numero-s-de-protocolo-s-caso-o-s-possua-1,#informe-como-foi-o-seu-contato-com-a-empresa-indique-o-s-numero-s-de-protocolo-s-caso-o-s-possua-1 ').each(function(){
                if($(this).val() === ''){
                  $('.formid-formularios form input:text').removeClass('error');
                  $(this).addClass('error');
                  $('html,body').animate({ scrollTop: $('.error').offset().top - 40}, 'slow');
                  event.preventDefault();
                  return false;
                }
              });
              if(!$('input[name="genero"]').is(':checked')){
                $('#genero').css('border','1px solid red');
                event.preventDefault();
                return false;
              }
              else{
                $('#genero').css('border','none');
              }
              if(!$('input[name="deseja-informar-a-empresa"]').is(':checked')){
                $('#deseja-informar-a-empresa').css('border','1px solid red');
                event.preventDefault();
                return false;
              }
              else{
               $('#deseja-informar-a-empresa').css('border','none');
              }
              if($('.contentLightbox input').prop('checked')==true) {
                return;
              }else{
                $('.contentLightbox').css('border','1px solid red');
                event.preventDefault();
                return false;
              }
            });

            $('#area-relativa-ao-produto-servico-reclamado').change(function(){
              if ($(this).val() == 'Alimentos'){
                escondeItens();
                $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-alimentos').show();
              }
              else if ($(this).val() == 'Assuntos Financeiros'){
                escondeItens();
                $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-assuntos-financeiros').show();
              }
              else if ($(this).val() == 'Fiscalização'){
                escondeItens();
                $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-fiscalizacao').show();
              }
              else if ($(this).val() == 'Habitação'){
                escondeItens();
                $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-habitacao').show();
              }
              else if ($(this).val() == 'Produtos'){
                escondeItens();
                $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-produtos').show();
              }
              else if ($(this).val() == 'Saúde'){
                escondeItens();
                $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-saude').show();
              }
              else if ($(this).val() == 'Serviços Essenciais'){
                escondeItens();
                $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-servicos-essenciais').show();
              }
              else if ($(this).val() == 'Serviços Privados'){
                escondeItens();
                $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-servicos-privados').show();
              }
              else if ($(this).val() == 'Outros'){
                escondeItens();
                $('#archetypes-fieldname-especificar-produto-servicos').show();
              }
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


    if ($('body').hasClass('userrole-reviewer') && ($('body').hasClass('template-login_success'))) {
       window.location.replace(portal_url + '/@@buscar_reclamacoes');      
    }

    if ($('body').hasClass('userrole-anonymous') && $('body').hasClass('subsection-formulario-de-denuncia')){
         window.location.replace(portal_url + '/@@register');
    }

    if ($('body').hasClass('userrole-reviewer') && $('body').hasClass('subsection-adesao-ao-procon-paulistano')){
         window.location.replace(portal_url + '/@@register');
    }

    if ($('body').hasClass('subsection-formulario-de-denuncia')) {
      insereInputFile();
      //FORMULARIOS AREA SELECIONADA
      $('#archetypes-fieldname-especificar-comprou').hide();
      function escondeItens(){
        $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-alimentos').hide();
        $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-assuntos-financeiros').hide();
        $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-fiscalizacao').hide();
        $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-habitacao').hide();
        $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-produtos').hide();
        $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-saude').hide();
        $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-servicos-essenciais').hide();
        $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-servicos-privados').hide();
        $('#archetypes-fieldname-especificar-produto-servicos').hide();
        $('#archetypes-fieldname-especificar-problema-apresentado').hide();
      }
      escondeItens();
      $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-alimentos').show();

      $('#assinale-o-tipo-de-problema-apresentado-alimentos, #assinale-o-tipo-de-problema-apresentado-assuntos-financeiros, #assinale-o-tipo-de-problema-apresentado-fiscalizacao, #assinale-o-tipo-de-problema-apresentado-habitacao, #assinale-o-tipo-de-problema-apresentado-produtos, #assinale-o-tipo-de-problema-apresentado-saude, #assinale-o-tipo-de-problema-apresentado-servicos-essenciais, #assinale-o-tipo-de-problema-apresentado-servicos-privados').change(function(){
        if ($(this).val() == 'Outros'){
          $('#archetypes-fieldname-especificar-problema-apresentado').show();
        }
        else{
          $('#archetypes-fieldname-especificar-problema-apresentado').hide();
        }
      });

      $('#como-voce-comprou-contratou').change(function(){
        if ($(this).val() == 'Outros'){
          $('#archetypes-fieldname-especificar-comprou').show();
        }
        else{
          $('#archetypes-fieldname-especificar-comprou').hide();
        }
      });


      $('#area-relativa-ao-produto-servico-reclamado').change(function(){
        if ($(this).val() == 'Alimentos'){
          escondeItens();
          $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-alimentos').show();
        }
        else if ($(this).val() == 'Assuntos Financeiros'){
          escondeItens();
          $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-assuntos-financeiros').show();
        }
        else if ($(this).val() == 'Fiscalização'){
          escondeItens();
          $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-fiscalizacao').show();
        }
        else if ($(this).val() == 'Habitação'){
          escondeItens();
          $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-habitacao').show();
        }
        else if ($(this).val() == 'Produtos'){
          escondeItens();
          $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-produtos').show();
        }
        else if ($(this).val() == 'Saúde'){
          escondeItens();
          $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-saude').show();
        }
        else if ($(this).val() == 'Serviços Essenciais'){
          escondeItens();
          $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-servicos-essenciais').show();
        }
        else if ($(this).val() == 'Serviços Privados'){
          escondeItens();
          $('#archetypes-fieldname-assinale-o-tipo-de-problema-apresentado-servicos-privados').show();
        }
        else if ($(this).val() == 'Outros'){
          escondeItens();
          $('#archetypes-fieldname-especificar-produto-servicos').show();
        }
      });
    }

    if ($('body').hasClass('subsection-formularios') || $('body').hasClass('subsection-formulario-de-denuncia')){
     //limpa textarea quando usuário clica
      $(document).on('focus', 'textarea', function() {
        if (this.value === this.defaultValue) {
            this.value = '';
        }
      })

      $(document).on('blur', 'textarea', function() {
          if (this.value === '') {
              this.value = this.defaultValue;
          }
      })



      $('<div class="usuario-ativo"><span>logado como: <strong>'+currentUser+'</strong> | <a href="'+portal_url+'/logout">sair</a></span></div>').insertBefore($("input[name='form_submit']"));
       lightboxForm();
      //CARREGA O PROTOCOLO NA VARIAVEL E COLOCA DENTRO DO INPUT
       var protocolo = $.ajax({ type: "POST",
                               url: portal_url + "/@@protocolo",
                               async: false,
                               data: { action: 'create' }
                             }).responseText;

      function updateProtocolo(protocolo) {
        $.ajax({ type: "POST",
                 url: portal_url + "/@@protocolo",
                 async: false,
                 data: { action: 'update', protocolo: protocolo }
               })
      }
      $('#archetypes-fieldname-protocolo input').val(protocolo);

      //var itensForm = $(".pfg-form.formid-formulario-de-denuncia").detach();
      $('.form-group .btnBuscar').click(function(){
          $('#content #content-core').append(itensForm);
          $('.form-group').addClass('active');
          $('.divRedireciona').slideUp();
          var protocolo = $.ajax({ type: "POST",
                       url: portal_url + "/@@protocolo",
                       async: false,
                       data: { action: 'create' }
                     }).responseText;
          $('#archetypes-fieldname-protocolo input').val(protocolo);
        });
    }

    //CARREGA O NUMERO DE PROTOCOLO NA PAGINA DE OBRIGADO DO FORMULÁRIO CONSUMIDOR
    if ($('body').hasClass('template-fg_thankspage_view_p3') && $('body').hasClass('subsection-formularios')){

      var protocoloNumber = $( "dl dd:last-child" ).text();
      //var itensObrigado = $("#content").detach();
      $('#content').html('<div class="form-group active" style="display:block"></div><div class="form-group2 active" style="display:block"></div><div class="form-group sucesso" style="display:block"><div class="sucessoReclamacao" style="display:block"><p><strong>Sua reclamação foi enviada com sucesso!</strong></p><p>O número de seu atendimento é:</p><span class="numeroProtocolo">'+protocoloNumber+'</span><p>Aguarde o retorno de sua reclamação via e-mail e guarde o número de seu atendimento</p></div></div>');
    }


    //CARREGA O NUMERO DE PROTOCOLO NA PAGINA DE OBRIGADO DO FORMULÁRIO DENUNCIA
    if ($('body').hasClass('template-fg_thankspage_view_p3') && $('body').hasClass('subsection-formulario-de-denuncia')){

      var protocoloNumber = $( "dl dd:last-child" ).text();
      //var itensObrigado = $("#content").detach();
      $('#content').html('<div class="sucessoReclamacao" style="display:block"><p>Prezado consumidor!</p><p>Sua denúncia foi registrada com sucesso.</p><p>O seu relato foi encaminhado à Divisão de Fiscalização para análise e adoção das providências cabíveis.</p><p>Agradecemos sua colaboração.</p><p>PROCON Paulistano</p></div>');
    }


    //CARREGA MENSAGEM DE OBRIGADO DO FORMULÁRIO FORNECEDOR
    if ($('body').hasClass('template-fg_thankspage_view_p3') && $('body').hasClass('subsection-adesao-ao-procon-paulistano')){

      var protocoloNumber = $( "dl dd:last-child" ).text();
      //var itensObrigado = $("#content").detach();
      $('#content').html('<div class="sucessoReclamacao" style="display:block"><p>Envio feito com sucesso!</p><p>Agradecemos sua colaboração.</p><p>PROCON Paulistano</p></div>');
    }


    //CADASTRO PESSOA FISICA OU JURIDICA
    $('.formid-cadastro-de-pessoa-fisica-e-juridica #tipo-de-consumidor_1').click(function(){
      $('#pfg-fieldsetname-juridica').hide();
      $('#pfg-fieldsetname-procurou-a-empresa-sim').show();
    });
    $('.formid-cadastro-de-pessoa-fisica-e-juridica #tipo-de-consumidor_2').click(function(){
      $('#pfg-fieldsetname-fisica').hide();
      $('#pfg-fieldsetname-juridica').show();
    });



    //categorias CONSUMIDOR.GOV
    $.ajax({
      url: portal_url + '/consumidorjson',
      dataType: 'json',
      type: 'post',
      success:function(data){

        // expressao regular para tratar acentos
        var tirarAcentos = function(newStringComAcento){
          var string = newStringComAcento;
          var mapaAcentosHex = {
            a : /[\xE0-\xE6-Á]/g,
            e : /[\xE8-\xEB]/g,
            i : /[\xEC-\xEF]/g,
            o : /[\xF2-\xF6]/g,
            u : /[\xF9-\xFC]/g,
            c : /\xE7/g,
            n : /\xF1/g
          }
          for ( var letra in mapaAcentosHex ) {
            var expressaoRegular = mapaAcentosHex[letra];
            string = string.replace( expressaoRegular, letra );
          }
          return string;
        }

        var data_filtered = [];
        $.each(data,function(key,value){
          data_filtered.push(
            {'label': tirarAcentos(value.titulo),
             'desc':value.categoria,
             'url':value.url,
             'original': value.titulo
            });
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
                $('.pfg-form.formid-formularios').hide();
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
            .append( "<a href='javascript:void(0);' title='"+item.original+"'><b>" + item.original + "</b><br>" + item.desc + "</a>" )
            .appendTo( ul );
        };
        $.ui.autocomplete.filter = function (array, term) {
          term = tirarAcentos(term);
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
        $('body').css("font-size","16px");

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

    // #reclamacao_status
    $(document).on('change',"#reclamacao_status",function(){
      $this = $(this);
      var reclamacao_status = $("option:selected", $this).text();
      var protocolo = $this.attr('rel');

      var url = portal_url + '/@@atualizar_reclamacao';
      $.post( url,
      {
          reclamacao_status:reclamacao_status,
          protocolo:protocolo
      }).done(function(){
        console.log('ajax com sucesso');
      });

    });

    // ABRE TELA INTERNA DA TABELA DE RECLAMAÇÕES 
    $(document).on('click',"td.reclamacao_buscar",function(){
      $this  = $(this);

      $tbody = $this.parent().parent();
      $this.parent().addClass('reclamacoes_abre_div_detalhes');

        // busca todas as tr da tabela
        $.each($tbody.children(),function(){
          $this  = $(this);
          if(!$this.hasClass('reclamacoes_abre_div_detalhes')){
            $this.hide() 
          } 
          else
          {
            var classes = ['reclamacao_buscar','categoria','pergunta','usuario'];
            for (var i = classes.length - 1; i >= 0; i--) {
              $this.find('.'+classes[i]).hide();
              $('th').hide();
              console.log(classes[i]);
            };
          }
        });
      $('.detalhesDuvida').show();
      $('td.td_interno').show().css('background-color','white');
      $(".filtrarPor").hide();
    });

    $(document).on('click',"td.duvidas_buscar",function(){
      
      $(".DuvidaDivInterno").show();
      $(".divReclamacoes").hide();
      $this = $(this).attr("class");
      var _id = $this.split('_')[0];
      $(this).parent().addClass('ok');
      var $observacao = $("."+_id+"_observacao").html();
      var $categoria = $("."+_id+"_categoria").html();
      var $data = $("."+_id+"_data").html();
      var $usuario = $("."+_id+"_usuario").html();
      var $pergunta = $("."+_id+"_pergunta").html();
      var $resposta = $("."+_id+"_resposta").html();
      var $mensagem = $("."+_id+"_mensagem").html();
      var $assunto = $("."+_id+"_assunto").html();
      var $operador = $("."+_id+"_operador").html();
      var $id = $("."+_id+"_id").html();
      var $lido = $("."+_id+"_lido").html();

      if($observacao !== ""){
        $("#observacao").html($observacao).attr('disabled',true);
      } else {
        $("#observacao").html($observacao).attr('disabled',false);
      }
      console.log($lido);
      if($lido == "True"){
        $("#lido_check").attr('disabled',true).attr("checked",true);
      } else{
        $("#lido_check").attr('disabled',false).attr("checked",false);
      }

      $("#tbl2").html($categoria);
      $("#tbl1").html($data);
      $("#tbl3").html($usuario);
      $("#pergunta").html($pergunta);
      $("#resposta").html($resposta);
      $("#mensagem").html($mensagem);
      $("#assunto").html($assunto);
      $("#operador").val($operador);
      $("#idObservacao").html(_id);
    });

    $("#voltar").on('click',function(){
      $(".DuvidaDivInterno").hide();
      $(".divReclamacoes").show();
    });


        // DUVIDAS PERGUNTA
        $(document).on('change','body.template-duvidas_view input[type=radio][class=duvida_util]',function(){
            url = portal_url + '/@@duvidas_salvar';

            var util = $(this).val();
            var parent_div = $(this).parent().parent().parent().parent().parent();
            var plone_id = $("h3",parent_div).data('id');
            var categoria = $("h3",parent_div).data('categoria');
            console.log(categoria);
            var pergunta = $("h3",parent_div).text();
            var usuario = $("#form_usuario_duvida",parent_div).val()
            var resposta = $(".textoAccordeon span.resposta_duvida",parent_div).text();
            if(util == 'sim'){
              util = true
            }else{
              util = false;
            }

            if (this.value == 'sim') {
              $(".replica", $(this).parent().parent()).hide();
              $(this).addClass('ok');

              $.post( url,
              {
                  util: util,
                  plone_id: plone_id,
                  pergunta: pergunta,
                  resposta: resposta,
                  usuario:usuario,
                  categoria:categoria
              }).done(function(){
                $('.mensagem_enviada', $('input.flashMessage').removeClass('flashMessage').parent().parent()).html("");
                $('.mensagem_enviada', $('input.ok').removeClass('ok').addClass('flashMessage').parent().parent()).append("<b>O Procon Paulistano agradece sua colaboração</b>");
              });
            }
            else if (this.value == 'nao') {
              if ($('body').hasClass('userrole-anonymous')) {
                $('.respostaUtil .divReplica').html('<p><strong>Por favor <a href="'+portal_url+'/@@register" title="se autentique">se autentique</a> para prosseguir.</strong></p>').show()
              }
              $('.mensagem_enviada', $('input.flashMessage').parent().parent()).html("");
              $(".replica", $(this).parent().parent()).show();
              $(".replica", $(this).parent().parent()).addClass('current');
              $(".respostaUtil > fieldset > .current > #enviarDuvida").on('click', function(){

                $(this).addClass('ok')
                var assunto = $("#assunto_opcao option:selected",parent_div).val();
                var mensagem = $("textarea",parent_div).val();
                $("#enviarDuvida").attr("disabled",true);
                $.post( url,
                {
                      util: util,
                      plone_id: plone_id,
                      pergunta: pergunta,
                      resposta: resposta,
                      assunto: assunto,
                      mensagem: mensagem,
                      usuario:usuario,
                      categoria:categoria
                }).done(function(){
                  $(".respostaUtil > fieldset").find('.current').removeClass('current');
                  $("#enviarDuvida").attr("disabled",false);
                  $(".replica").hide();
                  console.log($(this));
                  $('.mensagem_enviada', $('input.ok').removeClass('ok').parent().parent()).append("<b>O Procon Paulistano agradece sua colaboração</b>");
                })
              });
            }
        })

        $(".lido_reclamacoes").on('click',function(){
          var r = confirm("Deseja mudar este registro para cadastrado?");
          if (r == true) {
            $(this).addClass('ok');
            var protocolo =  $("._id",$('input[type=checkbox].ok').parent().parent() ).attr("rel");
            if(protocolo != ""){
              $.post( portal_url + '/@@reclamacoes_salvar',
              {
                  protocolo: protocolo,
              }).done(function(){
                $('input[type=checkbox].ok').attr('checked',true);
                $('input[type=checkbox].ok').removeClass('ok').attr('disabled',true);
              })              
            }
          }
        });


        $(".lido").on('click',function(){
          var r = confirm("Deseja mudar este registro para lido?");
          $(this).addClass('ok');
          if (r == true) {
            var identificacao =  $("._id",$('input[type=checkbox].ok').parent().parent() ).html();
            if (identificacao == undefined || identificacao == ""){
              identificacao = $("#idObservacao").html();
            }
            $.post( portal_url + '/@@duvidas_salvar',
            {
                identificacao: identificacao,
            }).done(function(){
              $('input[type=checkbox].ok').attr('checked',true);
              $('input[type=checkbox].ok').removeClass('ok').attr('disabled',true);
            })
          } else {
            $('input[type=checkbox].ok').removeClass('ok').attr('checked',false);
          }
        });

        $("#enviarComentario").on('click',function(){
            $.post( portal_url + '/@@duvidas_salvar',
            {
                identificacao: $("#idObservacao").html(),
                observacao: $("#observacao").val()
            }).done(function(){
              $('#observacao').attr('disabled',true);
            })
        });

        $('#table_id').dataTable( {
        "aoColumns": [
        null,
        { "sType": "date-uk" },
        null,
        null,
        null,
        { "orderDataType": "dom-checkbox", targets: 0 }

        ],
        "pagingType": "full_numbers",
        "iDisplayLength": 10,
        "bInfo": true,
        "language": {
          "emptyTable": "Nenhum registro encontrado"
        }
        });

        $.fn.dataTable.ext.order['dom-checkbox'] = function  ( settings, col )
        {
           return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
               return $('input', td).prop('checked') ? '1' : '0';
           } );
        };


        jQuery.extend( jQuery.fn.dataTableExt.oSort, {
        "date-uk-pre": function ( a ) {
            var ukDatea = a.split('/');
            return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
        },

        "date-uk-asc": function ( a, b ) {
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },

        "date-uk-desc": function ( a, b ) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
        } );

  })
})(jQuery);
function compareDates(date1, date2){
        var int_date1 = parseInt(date1.split("/")[2].toString() + date1.split("/")[1].toString() + date1.split("/")[0].toString());
        var int_date2 = parseInt(date2.split("/")[2].toString() + date2.split("/")[1].toString() + date2.split("/")[0].toString());
        if (int_date1 > int_date2){
            alert("Esta data precisa ser superior a data da compra/contrato do produto/serviço.");
            $('#quando-o-produto-ou-servico-apresentou-problema').val('');
        }
        return false;
    }
//MASCARA CPF CNPJ
function mascaraMutuario(o,f){
    v_obj=o
    v_fun=f
    setTimeout('execmascara()',1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function cpfCnpj(v){
    //Remove tudo o que nÃ£o Ã© dÃ­gito
    v=v.replace(/\D/g,"")
    if (v.length <= 14) { //CPF
        //Coloca um ponto entre o terceiro e o quarto dÃ­gitos
        v=v.replace(/(\d{3})(\d)/,"$1.$2")
        //Coloca um ponto entre o terceiro e o quarto dÃ­gitos
        //de novo (para o segundo bloco de nÃºmeros)
        v=v.replace(/(\d{3})(\d)/,"$1.$2")
        //Coloca um hÃ­fen entre o terceiro e o quarto dÃ­gitos
        v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    } else { //CNPJ
        //Coloca ponto entre o segundo e o terceiro dÃ­gitos
        v=v.replace(/^(\d{2})(\d)/,"$1.$2")
        //Coloca ponto entre o quinto e o sexto dÃ­gitos
        v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
        //Coloca uma barra entre o oitavo e o nono dÃ­gitos
        v=v.replace(/\.(\d{3})(\d)/,".$1/$2")
        //Coloca um hÃ­fen depois do bloco de quatro dÃ­gitos
        v=v.replace(/(\d{4})(\d)/,"$1-$2")
    }
    return v
}
