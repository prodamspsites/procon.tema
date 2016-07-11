var jq = jQuery.noConflict();

(function($) {
  $(document).ready(function() {
    if ($('body').hasClass('section-contato')) {
      $('#pfg-fieldwrapper').removeAttr('id');
    }

    $(document).on('submit', '.formCadastre, #login_form', function(e) {
      $('#__ac_name').val($('#__ac_name').val().replace(/\D/g,''))
    })

    $(document).on('submit', '#mail_password', function(e) {
      $('#userid').val($('#userid').val().replace(/\D/g,''))
    })

    $('.textoAccordeon').on('change', '#assunto_opcao', function() {
      thisParent = $(this).parent().parent().parent().parent().parent()
      if ($(this).val() === 'Não há resposta para minha pergunta') {
          $('.labelComent span', thisParent).text('Deixe sua pergunta no campo abaixo:');
          $('.agradece', thisParent).text('Em breve encaminharemos resposta para o e-mail cadastrado.')
      } else {
          $('.labelComent span', thisParent).text('Se desejar, envie comentários adicionais:')
          $('.agradece').text('O Procon Paulistano agradece sua colaboração.')
      }
    })

    $('.formid-formularios').on('change', '#qual-a-condicao-de-pagamento-do-produto-ou-servico-contratado-escolher-um-item', function() {
      if ($(this).val() === 'Parcelado') {
          $('#archetypes-fieldname-quantidade-de-parcelas-clique-ou-toque-aqui-para-inserir-o-texto, #archetypes-fieldname-valor-da-parcela-clique-ou-toque-aqui-para-inserir-o-texto').show()
      } else {
          $('#archetypes-fieldname-quantidade-de-parcelas-clique-ou-toque-aqui-para-inserir-o-texto, #archetypes-fieldname-valor-da-parcela-clique-ou-toque-aqui-para-inserir-o-texto').hide()
      }
    })

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
    if ($('body').hasClass('userrole-authenticated')) {
      var currentUser = $('.currentUser').text();
      // $('#portal-header').append('<div class="wrap" style="position:relative"><div class="loginAdmin"><span class="nome">'+currentUser+'</span> <a href="'+portal_url+'/logout" title="sair" class="btnSair">Sair</a></div></div>');
      $('.wrap .loginAdmin').show();
    }




    if ($('body').hasClass('template-mail_password_form')) {
      //MASCARA CPF CNPJ NO LOGIN
      // $('#cnpj-cpf').parent().find('label').html('CNPJ:');
      $('#userid').parent().prepend('<input type="radio" name="pessoa" value="juridica" id="rjuridica_senha" checked /><span class="rpessoa">Pessoa Jurídica</span><input type="radio" name="pessoa" value="fisica" id="rfisica_senha" /><span class="rpessoa">Pessoa Física</span>')
      $(document).on('click','#rfisica_senha', function(){
          $('#userid').parent().find('label').html('CPF:');
          $("#userid").removeClass('CNPJ').addClass('CPF').mask("999.999.999-99",{placeholder:""});
      });

      $(document).on('click','#rjuridica_senha', function(){
          $('#userid').parent().find('label').html('CNPJ:');
          $("#userid").removeClass('CPF').addClass('CNPJ').mask("99.999.999/9999-99",{placeholder:""});
      });
      $('#rfisica_senha').click();
    }

    //PAGINA ESQUECI SENHA/LOGIN/TROCAR SENHA/RESET
    $('.template-logged_out #portal-breadcrumbs').append('<span class="breadcrumbSeparator">&gt;</span><span id="breadcrumbs-current">Login</span></span>');
    $('#content #mail_password input[type="submit"]').val('Enviar');

    $('.template-registered #content .documentFirstHeading').html('Sucesso');

    if ($('body').hasClass('template-login_success')) {
      $('.template-login_success #content .documentFirstHeading').html('Você agora está autenticado');
      $('#content-core div p').html('Note que a barra superior direita foi modificada.<br />Ela agora contém uma área com seu CPF/CNPJ. Clique na seta ao lado do seu CPF/CNPJ para sair com segurança ou alterar sua senha.<br /><br />Atenção! Se você não permanecer autenticado após deixar esta página, configure o seu navegador para habilitar o uso de cookies.')
    }
    if ($('body').hasClass('template-mail_password_form')) {
      $('html head').find('title').text("Esqueci Minha Senha");
      $('#content .documentFirstHeading').html('Esqueci Minha Senha');
      $('#content .documentDescription').html('Para obter uma nova senha de acesso ao site do PROCON Paulistano, digite abaixo o seu CPF/CNPJ e clique em ENVIAR.<br /><br />Em poucos minutos, você receberá no e-mail cadastrado no site do PROCON Paulistano uma mensagem contendo um link para a geração de uma nova senha.');
      $('#mail_password .field label').text('CPF:');
      $('.template-mail_password_form #portal-breadcrumbs').append('<span class="breadcrumbSeparator">&gt;</span><span id="breadcrumbs-current">Esqueci minha senha</span></span>');
    }

    if ($('body').hasClass('template-trocar-senha')) {
      $('html head').find('title').text("ALTERE SUA SENHA");
      $('#content .documentFirstHeading').html('ALTERE SUA SENHA');
      $('#portal-breadcrumbs').append('<span class="breadcrumbSeparator">&gt;</span><span id="breadcrumbs-current">Trocar Senha</span></span>');
    }

     if ($('body').hasClass('template-pwreset_finish')) {
      $('html head').find('title').text("Senha Definida");
      $('#content .documentFirstHeading').html('Senha Definida');
      $('#content .documentDescription').html('Sua senha foi definida com sucesso. Clique aqui para acessar o <a href="/@@register" style="color:#f21c30">site</a>');
      $('#portal-breadcrumbs').append('<span class="breadcrumbSeparator">&gt;</span><span id="breadcrumbs-current">Senha Definida</span></span>');
    }
    if ($('body').hasClass('template-mail_password_response')) {
      $('html head').find('title').text("Esqueci Minha Senha");
      $('#content .documentFirstHeading').html('A mensagem para redefinição de sua senha foi enviada com sucesso.');
      $('#portal-breadcrumbs').append('<span class="breadcrumbSeparator">&gt;</span><span id="breadcrumbs-current">Redefinir Senha</span></span>');
      $('.documentDescription').html('Verifique sua caixa de e-mail.<br />Atenção! Caso seu e-mail possua sistema anti-spam, será necessário o recebimento de e-mails de naoresponder@prefeitura.sp.gov.br');
    }
    if ($('body').hasClass('template-pwreset_form')) {
      $('#content .documentFirstHeading').html('Esqueci Minha Senha');
      $('label[for="userid"]').html('CPF / CNPJ:');
      $('label[for="userid"]').parent().find('.formHelp').html('Informe seu CPF / CNPJ para verificação.');
      $('label[for="password"]').parent().find('.formHelp').html('Informe a sua nova senha. Ela deve ter no mínimo 5 caracteres.');
      $('input[type="submit"]').val('Enviar');
    }
    if ($('body').hasClass('template-pwreset_finish')) {
      $('#breadcrumbs-current').html('Senha Definida');
      $('#content .documentDescription').html('Sua senha foi definida com sucesso. Clique aqui para acessar o <a href="/@@register" style="color:#f21c30">site</a>');
    }
    if ($('body').hasClass('section-contato')) {
      $('.field.error').find('input, textarea').css('border','1px solid red');
      $('.fieldErrorBox').hide();
      $('.field.error').removeClass('error');
    }
    if ($('body').hasClass('template-pwreset_invalid')) {
      $('#content-core p').text('Por favor, certifique-se que você copiou a URL exatamente como ela aparece no e-mail e que você digitou seu CPF/CNPJ corretamente.');
    }
    //LOGIN
    $('.template-register #breadcrumbs-current').html('Login');

    //TEMPLATE BUSCAR_DUVIDAS
    if ($('body').hasClass('template-buscar_duvidas') || $('body').hasClass('template-buscar_reclamacoes') || $('body').hasClass('template-buscar_denuncias') || $('body').hasClass('template-buscar_fornecedores')) {
      var currentUser = $('.currentUser').text();
      $('#portal-header nav.menu ul').html('<li><a href="'+portal_url+'/buscar_reclamacoes">Reclamações</a></li><li><a href="'+portal_url+'/buscar_duvidas">Dúvidas</a></li><li><a href="'+portal_url+'/buscar_denuncias">Denúncias</a></li><li><a href="'+portal_url+'/buscar_fornecedores">Fornecedores</a></li>')
      // $('#portal-header').append('<div class="wrap" style="position:relative"><div class="loginAdmin"><span class="nome">'+currentUser+'</span> <a href="'+portal_url+'/logout" title="sair" class="btnSair">Sair</a></div></div>');
      $('.wrap .loginAdmin').show();
    }

    $(document).on('click','.btnupload', function(){
        $('input:file[value=""]').first().trigger('click');
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
            $("input:file").before('<div class="botaoUpload"><a class="btnupload">ANEXAR ARQUIVO(S)</a><p class="infoUpload">Até 5 arquivos, com até 20 MB de tamanho.</p></div>');
          }
          $("input[type='file']").on('change',function(){
              console.log($(this));
              var id  = $(this).attr('id');
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
            $('input:file[value!=""]').last().val('');
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
      checkUsername = $('#form-widgets-username').val();
      checkRazaoSocial = $('#form-widgets-razao_social').val();
      document.title = 'Formulário de Registro - Procon Paulistano';
      $('.documentFirstHeading').text('Primeira vez? Cadastre-se!')
      $('#portal-breadcrumbs').append('<span class="breadcrumbSeparator">&gt;</span><span id="breadcrumbs-current">Formulário de registro</span></span>');
      form = $('.kssattr-formname-register')
      $('#form-widgets-cadastro-0').prop('checked', true);
      municipio = '<div class="proconSPmessage"><p><strong>O PROCON PAULISTANO DIGITAL tem como atribuição atender os consumidores domiciliados no Município de São Paulo.</strong></p><p>A proteção e defesa do consumidor constitui-se em um sistema nacional coordenado pela Secretaria Nacional do Consumidor e integrado por diversos órgãos de defesa - federais, estaduais e municipais.</p><p>Se você possui domicílio em outra cidade, procure o órgão de proteção e defesa do consumidor de sua localidade. <a href="http://www.procon.sp.gov.br/categoria.asp?id=209" target="_blank">Acesse aqui</a> a lista dos Procons Municipais. Caso a sua cidade não esteja na lista, entre em contato com a <a href="http://www.procon.sp.gov.br/categoria.asp?id=42" target="_blank"> FUNDAÇÃO PROCON.</a></p></div>';
      tipo = $('.kssattr-fieldname-form\\.widgets\\.cadastro').clone();
      nome = $('.kssattr-fieldname-form\\.widgets\\.fullname').clone();
      $('label', nome).text('Nome completo *');
      user_CPF = $('.kssattr-fieldname-form\\.widgets\\.username').clone();
      $('label', user_CPF).text('CPF *');
      $('input', user_CPF).addClass('CPF');
      user_CNPJ = $('.kssattr-fieldname-form\\.widgets\\.username').clone();
      $('label', user_CNPJ).text('CNPJ *');
      $('input', user_CNPJ).addClass('CNPJ');
      idade = $('#formfield-form-widgets-adicional_um').clone();
      deficiencia = $('#formfield-form-widgets-adicional_tres').clone();
      doenca_grave = $('#formfield-form-widgets-doenca_grave').clone();
      especificar = $('#formfield-form-widgets-deficiencia_especificar').clone()
      cnpj = $('.kssattr-fieldname-form\\.widgets\\.cpf').clone();
      $('label', cnpj).text('CNPJ *');
      tipo_societario = $('.kssattr-fieldname-form\\.widgets\\.tipo_societario').clone();
      enquadramento = $('.kssattr-fieldname-form\\.widgets\\.enquadramento').clone();
      cpf_pj = $('.kssattr-fieldname-form\\.widgets\\.cpf').clone();
      $('label', cpf_pj).text('CPF do representante *').clone();
      rg_pj = $('.kssattr-fieldname-form\\.widgets\\.rg').clone();
      $('label', rg_pj).text('RG do representante *').clone();
      site = $('.kssattr-fieldname-form\\.widgets\\.site').clone();
      uf = $('.kssattr-fieldname-form\\.widgets\\.unidade_federativa').clone();
      uf_expedidor = $('.kssattr-fieldname-form\\.widgets\\.uf_estados').clone();
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
      $('label', email).text('E-Mail *');
      email_confirmacao = $('.kssattr-fieldname-form\\.widgets\\.confirmacao').clone();
      $('label', email_confirmacao).text('Confirmação de E-Mail *');
      senha = $('.kssattr-fieldname-form\\.widgets\\.password').clone();
      $('label', senha).text('Senha *');
      senha_confirmacao = $('.kssattr-fieldname-form\\.widgets\\.password_ctl').clone();
      $('label', senha_confirmacao).text('Confirmação de senha *');
      razao_social = $('.kssattr-fieldname-form\\.widgets\\.razao_social').clone();
      nome_fantasia = $('.kssattr-fieldname-form\\.widgets\\.nome_fantasia').clone();
      responsavel = $('.kssattr-fieldname-form\\.widgets\\.responsavel').clone();
      estado_civil = $('.kssattr-fieldname-form\\.widgets\\.estadocivil').clone();
      nascimento = $('.kssattr-fieldname-form\\.widgets\\.data_nascimento').clone();
      celular = $('.kssattr-fieldname-form\\.widgets\\.contato_celular').clone();
      captcha = '<div id="g-recaptcha"></div>';
      $('#form-buttons-register').addClass('disabled').attr('disabled', true);
      enviar = $('.formControls').clone();

      var verifyCallback = function(response) {
        $('#form-buttons-register').removeClass('disabled').attr('disabled', false);
      };

      //NOME APENAS LETRAS
      $("#form-widgets-fullname").on("input", function(){
        var regexp = /[^a-zA-Z]/g;
        if($(this).val().match(regexp)){
          $(this).val( $(this).val().replace(regexp,'') );
        }
      });

      pf = $(form).clone();
      pj = $(form).clone();
      $('div', pf).remove();
      $('div', pj).remove();
      form.html( $(pj).append($(municipio).html() + $(tipo).html()).html()).show()
      pj = $(pf).clone();
      $(pf).prepend($(municipio).html() + $(tipo).html() + $(user_CPF).html() + $(rg).html() + $(expeditor).html() +
                    $(uf_expedidor).html() + $(nome).html() + $(genero).html() + $(estado_civil).html() + $(nascimento).html() +
                    '<div class="formQuestion label fonteMaior">Dados de contato<span class="formHelp"' +
                    'id="dados-de-contato-juridico_help"></span></div>' +
                    $(telefone).html() + $(cep).html() + $(logradouro).html() +
                    $(complemento).html() + $(bairro).html() +
                    $(cidade).html() + $(uf).html() + $(email).html() + $(email_confirmacao).html() +
                    $(senha).html() + $(senha_confirmacao).html() +
                    '<div class="formQuestion label fonteMaior">Dados adicionais<span class="formHelp"' +
                    'id="dados-de-contato-juridico_help"></span></div>' +
                    $(idade).html() + $(deficiencia).html() + $(doenca_grave).html() + captcha + $(enviar).html()
                   );

      $(municipio, pj).remove()
      $(pj).prepend($(municipio).html() + $(tipo).html() + '<br /><p class="mensagemPJ">O PROCON PAULISTANO DIGITAL pode atender pessoas jurídicas na condição de consumidoras. Cumpre esclarecer que a pessoa jurídica pode ser considerada consumidora quando adquire produto ou serviço como destinatária final, isto é, quando utiliza o produto ou serviço para satisfazer sua própria necessidade e não a de seus clientes.</p>' +
                    $(user_CNPJ).html() + $(razao_social).html() + $(nome_fantasia).html() +
                    $(tipo_societario).html() + $(enquadramento).html() + $(responsavel).html() +
                    $(cpf_pj).html() + $(rg_pj).html() + $(expeditor).html() + $(uf_expedidor).html() +
                    '<div class="formQuestion label fonteMaiorJuridico">Dados de contato<span class="formHelp"' +
                    'id="dados-de-contato-juridico_help"></span></div>' +
                    $(telefone).html() + $(cep).html() + $(logradouro).html() +
                    $(complemento).html() + $(bairro).html() + $(cidade).html() +
                    $(uf).html() + $(site).html() + $(email).html() + $(email_confirmacao).html() +
                    $(senha).html() + $(senha_confirmacao).html() + captcha + $(enviar).html()
                   );
      $(user_CNPJ, pf).find('input').mask("999.999.999-99");
      $(document).on('click', '#form-widgets-cadastro-0', function(){
        form.html($(pf).html()).show()
        mascarasForms();
        grecaptcha.render('g-recaptcha', {
          'sitekey' : '6LdeTyATAAAAALjEG3QbmRh0hWAiZRM6jTx3mdtg',
          'callback' : verifyCallback
        });

        $('#form-widgets-data_nascimento').datepicker({ dateFormat: 'dd/mm/yy' });
        $('#form-widgets-cadastro-0').prop('checked', true);
        $('#content .rowlike select').find('option:first-child').remove();
        $('#form-widgets-municipio-0').attr('checked', 'checked');
        $('#form-widgets-cidade').val('São Paulo').attr('disabled', true);
        $('#form-widgets-unidade_federativa').val('SP').attr('disabled', true);
      });

      $(document).on('click', '#form-widgets-cadastro-1', function(){
        form.html($(pj).html()).show()
        mascarasForms();
        grecaptcha.render('g-recaptcha', {
          'sitekey' : '6LdeTyATAAAAALjEG3QbmRh0hWAiZRM6jTx3mdtg',
          'callback' : verifyCallback,
        });
        $('#form-widgets-cadastro-1').prop('checked', true);
        $('#content .rowlike select').find('option:first-child').remove();
        $('#form-widgets-municipio-0').attr('checked', 'checked');
        $('#form-widgets-cidade').val('São Paulo').attr('disabled', true);
        $('#form-widgets-unidade_federativa').val('SP').attr('disabled', true);
      });

      if (checkUsername != '') {
        if (checkRazaoSocial != '') {
          $('#form-widgets-cadastro-1').click();
        } else {
          $('#form-widgets-cadastro-0').click();
        }
      }

      $('#content-core').append('<form class="enableAutoFocus formCadastre" method="post" id="login_form" action="'+portal_url+'/login_form#register"><div id="login-form"><input type="hidden" name="came_from" value=""><input type="hidden" name="next"><input type="hidden" name="ajax_load"><input type="hidden" name="ajax_include_head"><input type="hidden" name="target"><input type="hidden" name="mail_password_url"><input type="hidden" name="join_url"><input type="hidden" name="form.submitted" value="1"><input type="hidden" name="js_enabled" id="js_enabled" value="0"><input type="hidden" name="cookies_enabled" id="cookies_enabled" value=""><input type="hidden" name="login_name" id="login_name" value=""><input type="hidden" name="pwd_empty" id="pwd_empty" value="0"><div class="divLoginCadastre"><h2>Já sou cadastrado</h2><p>Faça seu login:</p><div class="field"><label for="__ac_name">CPF/CNPJ:</label><input type="text" size="40" name="__ac_name" id="__ac_name" value=""></div><div class="field"><label for="__ac_password">Senha :</label><input type="password" size="40" name="__ac_password" id="__ac_password"></div><div id="login-forgotten-password"><p class="discreet"><span><a href="'+portal_url+'/Procon/mail_password_form?userid=">Esqueci minha senha</a></span>.</p></div><div class="formControls"><input class="context" type="submit" name="submit" value="ENTRAR"></div></div></form></div>')

      //MASCARA CPF CNPJ NO LOGIN
      // $('#cnpj-cpf').parent().find('label').html('CNPJ:');
      $('#__ac_name').parent().prepend('<input type="radio" name="pessoa" value="juridica" id="rjuridica_login" checked /><span class="rpessoa">Pessoa Jurídica</span><input type="radio" name="pessoa" value="fisica" id="rfisica_login" /><span class="rpessoa">Pessoa Física</span>')
      $(document).on('click','#rfisica_login', function(){
          $('#__ac_name').parent().find('label').html('CPF:');
          $("#__ac_name").removeClass('CNPJ').addClass('CPF').mask("999.999.999-99",{placeholder:""});
      });

      $(document).on('click','#rjuridica_login', function(){
          $('#__ac_name').parent().find('label').html('CNPJ:');
          $("#__ac_name").removeClass('CPF').addClass('CNPJ').mask("99.999.999/9999-99",{placeholder:""});
      });
      $('#rfisica_login').click();

      $(document).on('blur', '#form-widgets-codigo_enderecamento_postal', function() {
        CEP = $(this).val().replace(/\D/g,'');
        returnCEP = pesquisaCEP(CEP);
        if (!(returnCEP)) {
          $(this).val('');
        }
      })

      $(document).on('blur', '#form-widgets-email', function() {
        email = $(this).val();
        var emailReg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
         var emailaddress = $("#form-widgets-email").val();
         if(!emailReg.test(emailaddress)) {
            $('#form-widgets-email').addClass('error');
            alert('E-mail inválido!');
             $('#form-widgets-email').val('');
          }
         else{
            $('#e-mail').removeClass('error');
          }

        confirmacao = $('#form-widgets-confirmacao').val();
        if ((email != '') &&  (confirmacao != '') && (email != confirmacao)) {
          AdicionaMensagemErro($(this), 'O e-mail digitado não confere')
        } else {
          removeError($(this))
          removeError($('#form-widgets-confirmacao'));
        }
      })

      $(document).on('blur', '#form-widgets-confirmacao', function() {
        email = $('#form-widgets-email').val();
        confirmacao = $(this).val();
        if ((email != '') &&  (confirmacao != '') && (email != confirmacao)) {
          AdicionaMensagemErro($(this), 'O e-mail digitado não confere')
        } else {
          removeError($(this));
          removeError($('#form-widgets-email'))
        }
      })

      $(document).on('blur', '#form-widgets-cpf', function() {
        CPF = $(this).val().replace(/\D/g,'');
        returnCPF = testaCPF(CPF);
        if (!(returnCPF)) {
          AdicionaMensagemErro($(this), 'CPF inválido')
        } else {
          removeError($(this));
        }
      })

      $("form.kssattr-formname-register").submit(function( event ) {
        $(".kssattr-formname-register input:text").not('#form-widgets-data_nascimento, #form-widgets-deficiencia_especificar, #form-widgets-contato_celular, #form-widgets-site, #form-widgets-nome_fantasia').each(function(){
          if($(this).val() === ''){
            $('.kssattr-formname-register input:text').removeClass('error');
            $(this).addClass('error');
            $('html,body').animate({ scrollTop: $('.error').offset().top - 40}, 'slow');
            event.preventDefault();
            return false;
          }
          else {
            $('#form-widgets-username').val($('#form-widgets-username').val().replace(/\D/g,''))
          }
        });
      });

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


           function preparaForm() {
            form.html($(pf).html()).show()
            mascarasForms();
            $('#form-widgets-data_nascimento').datepicker({ dateFormat: 'dd/mm/yy' });
            $('#form-widgets-municipio-0').prop('checked', true);
            $('#content-core .rowlike').find('.proconSPmessage').hide();
            $('#content .rowlike select').find('option:first-child').remove();
            $('#form-widgets-cadastro-0').attr('checked', 'checked');
            $('#form-widgets-cidade').val('São Paulo').attr('disabled', true);
            $('#form-widgets-unidade_federativa').val('SP').attr('disabled', true);
           }

    //MASCARA
           function mascarasForms(){
           $("#data-de-nascimento, #form-widgets-data_nascimento").mask("99/99/9999");
           $("#data-de-compra-ou-assinatura-do-contrato").mask("99/99/9999");
           $("#quando-voce-comprou-o-produto-ou-contratou-o-servico-1").mask("99/99/9999");
           $("#qual-o-valor-total-do-produto-servico-clique-ou-toque-aqui-para-inserir-o-texto-1").maskMoney({showSymbol:true, symbol:"R$", decimal:",", thousands:"."});
           $("#valor-da-parcela-clique-ou-toque-aqui-para-inserir-o-texto").maskMoney({showSymbol:true, symbol:"R$", decimal:",", thousands:"."});
           $("#quando-o-produto-ou-servico-apresentou-problema").mask("99/99/9999");
           $("#data-da-compra-ou-assinatura-do-contrato").mask("99/99/9999");
           $("#telefone, #form-widgets-contato_telefone, #telefone-1").mask("(99) 9999-9999?9")
            .focusout(function (event) {
                var target, phone, element;
                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                phone = target.value.replace(/\D/g, '');
                element = $(target);
                element.unmask();
                if(phone.length > 10) {
                    element.mask("(99) 99999-999?9");
                } else {
                    element.mask("(99) 9999-9999?9");
                }
            });
           $("#telefone, #form-widgets-contato_telefone, #form-widgets-contato_celular").mask("(99) 9999-9999?9")
            .focusout(function (event) {
                var target, phone, element;
                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                phone = target.value.replace(/\D/g, '');
                element = $(target);
                element.unmask();
                if(phone.length > 10) {
                    element.mask("(99) 99999-999?9");
                } else {
                    element.mask("(99) 9999-9999?9");
                }
            });
           $("#cep, #form-widgets-codigo_enderecamento_postal, #cep-juridico").mask("99999-999");
           $("#cpf, #form-widgets-cpf, .CPF").mask("999.999.999-99");
           $("#cnpj, .CNPJ").mask("99.999.999/9999-99",{placeholder:""});
           $("#cnpj-cpf").mask("99.999.999/9999-99");
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

    $(document).on('keyup', '#project', function() {
        if ((this.value !== '') && !($(this).hasClass('disabled')) && $(this).hasClass('loading')) {
          $('.form-group .btnBuscar').attr('disabled', false).removeClass('disabled')
        }
    })


    //MASCARA CPF CNPJ
    // $('#cnpj-cpf').parent().find('label').html('CNPJ:');
    $('#cnpj-cpf').parent().prepend('<div class="field PFG-RichLabel" id="archetypes-fieldname-dados-do-fornecedor-reclamado"><h4 class="fonteMenor"><strong>Preencha com um CNPJ / CPF válido ou informe o endereço completo do fornecedor.</strong></h3></div><input type="radio" name="pessoa" value="juridica" id="rjuridica" checked /><span class="rpessoa">Pessoa Jurídica</span><input type="radio" name="pessoa" value="fisica" id="rfisica" /><span class="rpessoa">Pessoa Física</span>')
    $(document).on('click','#rfisica', function(){
        $('#cnpj-cpf').parent().find('label').html('CPF:');
        $("#cnpj-cpf").removeClass('CNPJ').addClass('CPF').mask("999.999.999-99",{placeholder:""});
    });

    $(document).on('click','#rjuridica', function(){
        $('#cnpj-cpf').parent().find('label').html('CNPJ:');
        $("#cnpj-cpf").removeClass('CPF').addClass('CNPJ').mask("99.999.999/9999-99",{placeholder:""});
    });
    $('#rjuridica').click();

    $(document).on('keydown', '.divProtocolo .inputProtocolo', function() {
      $('.btnProsseguir').removeClass('disabled').attr('disabled', false)
    })

    $(document).on('keydown, blur', '#bairro, #cidade, #form-widgets-fullname', function() {
      $(this).val( $(this).val().replace(/\d+/g, '') )
    })


    $(document).on('blur', '.divProtocolo .inputProtocolo', function() {
      testaProcotoloConsumidor($(this))
    })


    function testaProcotoloConsumidor(inputObject) {
      protocolo = $(inputObject).val().replace(/\D/g,'')
      validador_str = protocolo.substring(0, 4);
      if ((protocolo != '') && ($('.inputProtocolo').val().replace(/[^0-9]/g, '').length == 17) && (2014 < parseInt(validador_str)) && (parseInt(validador_str) < 2030)) {
        $('.btnProsseguir').removeClass('disabled').attr('disabled', false)
      } else {
        $('.btnProsseguir').addClass('disabled').attr('disabled', true)
        alert('Protocolo inválido');
      }
    }


    $(document).on('blur', '.CPF, #cpf', function() {
      CPF = $(this).val().replace(/\D/g,'');
      inputs = $('#cep, #logradouro, #numero-complemento, #bairro, #cidade, #uf')
      if (!(testaCPF(CPF))) {
        $(inputs).addClass('inputObrigatorio').each(function() {
          thisParent = $(this).parent();
          label = $('label', thisParent)
          if ($(label).text().indexOf('*') == -1) {
            text = $(label).text() + ' *'
            $(label).text(text)
          }
        });
        $(this).val('')
        confirm("CPF inválido")
      } else {
        $(inputs).removeClass('inputObrigatorio').each(function() {
          removeError($(this));
          thisParent = $(this).parent();
          label = $('label', thisParent)
          if (label.text().indexOf('*') != -1) {
            $(label).text(label.text().slice(0, -2))
          }
        });
      }
    })

    $(document).on('blur', '.CNPJ', function() {
      CNPJ = $(this).val().replace(/\D/g,'');
      inputs = $('#cep, #logradouro, #numero-complemento, #bairro, #cidade, #uf')
      if (!(testaCNPJ(CNPJ))) {
        $(inputs).addClass('inputObrigatorio').each(function() {
          thisParent = $(this).parent();
          label = $('label', thisParent)
          if ($(label).text().indexOf('*') == -1) {
            text = $(label).text() + ' *'
            $(label).text(text)
          }
        });
        alert('CNPJ inválido')
        $(this).val('')
      } else {
        $(inputs).removeClass('inputObrigatorio').each(function() {
          removeError($(this));
          thisParent = $(this).parent();
          label = $('label', thisParent)
          if (label.text().indexOf('*') != -1) {
            $(label).text(label.text().slice(0, -2))
          }
        });
      }
    })

    $(document).on('change', '.contentLightbox input.error', function() {
      if(this.checked) {
        $('.contentLightbox').css('border','0px');
        removeError($(this));
      }
    })


    $(document).on('blur', '#cnpj', function() {
      CNPJ = $(this).val().replace(/\D/g,'');
      if (!(testaCNPJ(CNPJ))) {
        alert('CNPJ inválido')
        $(this).val('')
      }
    })

    $(document).on('blur', '.formid-formularios .inputObrigatorio', function() {
        testaOtherInput($(this));
    })



    $(document).on('blur', '.formid-formularios input:text', function() {
      if (!($(this).hasClass('CPF')) && !($(this).hasClass('CNPJ'))) {
        testaInput($(this));
      }
    })

    $(document).on('blur', '.formid-formularios textarea', function() {
      testaTextarea($(this), this.value, this.defaultValue);
    })

    function testaTextarea(inputObject, current, defaultValue) {
      if ((current !== '') && (current != defaultValue)) {
        removeError(inputObject);
      } else {
        addError(inputObject);
      }

    }

    function testaOtherInput(inputObject) {
      if ($(inputObject).val() != '') {
        removeError(inputObject);
      } else {
        addOtherError(inputObject);
      }
    }

    function testaInput(inputObject) {
      if ($(inputObject).val() != '') {
        removeError(inputObject);
      } else {
        addError(inputObject);
      }
    }

    function removeError(inputObject) {
      thisParent = $(inputObject).parent();
      $(inputObject).removeClass('error');
      $('.ErrorMessage', thisParent).remove();
      if ($('input.error') !== 0) {
        btnSubmit = $("input[name='form_submit']");
        wrapper = $('#hasErrors');
        if (wrapper !== 0) {
          $(wrapper).remove()
          $(btnSubmit).removeClass('disabled').attr('disabled', false);
        }
      }
    }

    function addOtherError(inputObject) {
      thisParent = $(inputObject).parent();
      label = $('label', thisParent).text();
      AdicionaMensagemErro(inputObject, 'Por favor, preencha o campo abaixo')
    }

    function addError(inputObject) {
      thisParent = $(inputObject).parent();
      label = $('label', thisParent).text();
      if (label.indexOf('*') != -1) {
        AdicionaMensagemErro(inputObject, 'Por favor, preencha o campo abaixo')
      }
    }

    function AdicionaMensagemErro(inputObject, message) {
      $(inputObject).addClass('error');
      objParent = $(inputObject).parent();
      errorWrapper = $('.ErrorMessage', objParent);
      if (errorWrapper.length == 0) {
       $('<span class="ErrorMessage">' + message + '</span>').insertBefore($(inputObject));
      } else {
        $(errorWrapper).text(message)
      }
      wrapper = $('#hasErrors');
      btnSubmit = $("input[name='form_submit']");
      if (wrapper.length == 0) {
        $('<span id="hasErrors">Por favor, corrija os campos em vermelho para enviar o formulário</span>').insertBefore($(btnSubmit))
        $(btnSubmit).addClass('disabled').attr('disabled', true);
      }

    }

    //COMPARA DATAS
    $( "#quando-o-produto-ou-servico-apresentou-problema" ).focusout(function() {
        dataInicial = $('#quando-voce-comprou-o-produto-ou-contratou-o-servico-1').val();
        dataFinal = $('#quando-o-produto-ou-servico-apresentou-problema').val();
        if(checaMaiorQAmanha(dataFinal)){
          //data valida
          compareDates(dataInicial,dataFinal);
        }else{
          //data nao valida
          $('#quando-o-produto-ou-servico-apresentou-problema').val('');
          alert('Não é possivel inserir esta data');
        }

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

    $('#o-produto-ou-servico-foi-pago-por-voce-no-seu-cpf_1').click(function(){
      $('#archetypes-fieldname-cpf').hide();
    });

    $('#o-produto-ou-servico-foi-pago-por-voce-no-seu-cpf_2').click(function(){
      $('#archetypes-fieldname-cpf').show();
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
                   $("input[name='form_submit']").before("<div class='contentLightbox'><input type='checkbox'>Concordo em disponibilizar as informações contidas em minha reclamação para que sejam divulgadas no site de acordo com os <a href='javascript:void(0);' class='linkLightbox'>Termos de Uso</a> e <a href='javascript:void(0);' class='linkLightboxPolitica'>Políticas de Privacidade.</a></div></div>");
                }
              }
          })
          $(document).on('click','.linkLightbox', function(){
              lightboxForm();
              $('.lightboxGeral').show();
              $('.lightboxGeralP').hide();
          });
           $(document).on('click','.btnTooltip', function(){
              $('.tooltip-area').toggle();
          });
          $(document).on('click','.fechaLightbox', 'body',function(){
              $('.lightboxGeral').hide();
              $('.lightboxGeralP').hide();
          });
          $(document).on('click','.fechaTooltip', function(){
              $('.tooltip-area').hide();
          });
      }

      //VALIDACAO E-MAIL
      function validaEmailReclamacao(){
        $(document).on('blur', '#e-mail', function() {
          var emailReg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
           var emailaddress = $("#e-mail").val();
           if(!emailReg.test(emailaddress)) {
              $('#e-mail').addClass('error');
              alert('E-mail inválido!');
            }
           else{
              $('#e-mail').removeClass('error');
            }
        })
      }

      function lightboxFormPolitica() {
          lightbox_urlP = portal_url + '/politica-de-privacidade/politica';
          $.ajax({
              url: lightbox_urlP, success: function(lightboxP) {
                lightbox_tituloP = $(lightboxP).find('.titPage').html();
                lightbox_textP = $(lightboxP).find('.contentBody').html();
                $('body').append("<div class='lightboxGeralP'><div class='lightbox-div'><h2>"+lightbox_tituloP+"</h2><div class='divScrollLight'>"+lightbox_textP+"</div><a href='javascript:void(0);' class='fechaLightbox'>FECHAR</a></div></div>");
                if(!$('.contentLightbox').size()){
                   $('.usuario-ativo').before("<div class='contentLightbox'><input type='checkbox'>Concordo em disponibilizar as informações contidas em minha reclamação para que sejam divulgadas no site de acordo com os <a href='javascript:void(0);' class='linkLightbox'>Termos de Uso</a> e <a href='javascript:void(0);' class='linkLightboxPolitica'>Políticas de Privacidade.</a></div></div>");
                }
              }
          })
          $(document).on('click','.linkLightboxPolitica', function(){
              lightboxFormPolitica();
              $('.lightboxGeral').hide();
              $('.lightboxGeralP').show();
          });
          $(document).on('click','.fechaLightbox', 'body',function(){
              $('.lightboxGeral').hide();
              $('.lightboxGeralP').hide();
          });
      }

    // MENU LOGIN
    $(document).on('click','.loginAdmin .setaLogin', function(){
      $('.menuLogin').toggle();
      return false;
    });
    //MENU LOGIN MOBILE
    if ($(window).width() <= 1020){
               $(document).on('click','.loginAdmin', function(){
                $('.menuLogin').toggle();
                $('.loginAdmin a').toggle();
                //return false;
              });
        }

     if ($('body').hasClass('template-login_form') || $('body').hasClass('template-logged_out') || $('body').hasClass('template-register')) {
       $('#login_form div.formControls input').addClass('disabled').attr('disabled', true);
       var verifyCallbackRegister = function(response) {
         $('#login_form div.formControls input').removeClass('disabled').attr('disabled', false);
       };
       $('<div id="g-recaptcha"></div>').insertBefore('#login_form div.formControls')
       grecaptcha.render('g-recaptcha', {
         'sitekey' : '6LdeTyATAAAAALjEG3QbmRh0hWAiZRM6jTx3mdtg',
         'callback' : verifyCallbackRegister
       });

     }

    if ($('body').hasClass('template-register')) {
      $('#login_form div.formControls input').addClass('disabled').attr('disabled', true);
      var verifyCallbackRegister = function(response) {
        $('#login_form div.formControls input').removeClass('disabled').attr('disabled', false);
      };
      $('<div id="g-recaptcha"></div>').insertBefore('#login_form div.formControls')
      grecaptcha.render('g-recaptcha', {
        'sitekey' : '6LdeTyATAAAAALjEG3QbmRh0hWAiZRM6jTx3mdtg',
        'callback' : verifyCallbackRegister
      });

    }


    //OCULTA FORMULARIO CONSUMIDOR
    if (!($('body').hasClass('subsection-formularios'))){
      $('#viewlet-below-content-title .form-group').remove();
    }
    if ($('body').hasClass('portaltype-formfolder') && $('body').hasClass('subsection-formularios')) {
        var itensForm = $(".formDuvidas .pfg-form").detach();
        $('.form-group #project').addClass('loading')
        $('.form-group .btnBuscar, .btnProsseguir').click(function(){
            $(document).on('blur', '#quando-voce-comprou-o-produto-ou-contratou-o-servico-1', function() {
              //checa se uma data é valida
              if(!checaMaiorQAmanha($(this).val()) ){
                $('#quando-voce-comprou-o-produto-ou-contratou-o-servico-1').val('');
                alert('Não é possivel inserir esta data!')
              }

            });
            lightboxForm();
            lightboxFormPolitica();
            validaEmailReclamacao();
            $('#content #content-core').append(itensForm);
            $('.form-group').addClass('active');
            $('.divRedireciona').slideUp();
            wrapper_exclusivos = $('.campos_exclusivos')
            campo_exclusivo1 = $('#archetypes-fieldname-campos-de-uso-exclusivo-para-conveniados-e-acoes-estrategicas');
            campo_exclusivo2 = $('#archetypes-fieldname-matricula-codigo');
            if ((wrapper_exclusivos.length == 0) && (campo_exclusivo1.length != 0) && (campo_exclusivo2.length != 0)) {
              $("input[name='form_submit']").before('<div class="campos_exclusivos"><div>')
              $('.campos_exclusivos').append( $(campo_exclusivo1).remove().html() + $(campo_exclusivo2).remove().html() )
            }
            $('label[for="campos-de-uso-exclusivo-para-conveniados-e-acoes-estrategicas"], .campos_exclusivoss').addClass('negrito')
            // $('#quando-voce-comprou-o-produto-ou-contratou-o-servico-1').datepicker({dateFormat: 'dd/mm/yy', onSelect: function(iDate){
            //     $('#quando-o-produto-ou-servico-apresentou-problema').datepicker('destroy');
            //     selectedDate = new Date($.datepicker.formatDate('yy-mm-dd', $('#quando-voce-comprou-o-produto-ou-contratou-o-servico-1').datepicker('getDate')));
            //     $('#quando-o-produto-ou-servico-apresentou-problema').datepicker({dateFormat: 'dd/mm/yy', minDate: new Date(selectedDate)});
            //   }
            // })
            // $('#quando-o-produto-ou-servico-apresentou-problema').datepicker({ dateFormat: 'dd/mm/yy', onSele });
            $('#archetypes-fieldname-cpf').hide();
            $('#archetypes-fieldname-quantidade-de-parcelas-clique-ou-toque-aqui-para-inserir-o-texto, #archetypes-fieldname-valor-da-parcela-clique-ou-toque-aqui-para-inserir-o-texto').hide()
            $('#nome-da-empresa-fornecedor').val($('#project').val());
            if ($('body').hasClass('userrole-anonymous') && $('.irparalogin').length ==0) {
              $('#content').append('<div class="pfg-form formid-formularios"><div class="facaReclamaLogin"><strong>Cadastre-se ou faça login para prosseguir:<br><a href="'+portal_url+'/@@register" class="irparalogin" title="IR PARA CADASTRO/LOGIN">IR PARA CADASTRO/LOGIN</a></div></div>');
            }
            //REMOVER FORM RECLAMACAO CASO USUARIO ESTIVER DESLOGADO
            if ( $('body').hasClass('subsection-formularios') && $('body').hasClass('userrole-anonymous')) {
              $('#content-core .formid-formularios').hide();
              $('#content-core .formid-formularios #fg-base-edit').remove();
            }

            inputs = $('#cep, #logradouro, #numero-complemento, #bairro, #cidade, #uf')
            $(inputs).addClass('inputObrigatorio').each(function() {
              thisParent = $(this).parent();
              label = $('label', thisParent)
              if ($(label).text().indexOf('*') == -1) {
                text = $(label).text() + ' *'
                $(label).text(text)
              }
            })
            labelFile = $('#archetypes-fieldname-para-auxiliar-na-analise-da-sua-reclamacao-voce-deve-anexar-documentos-comprobatorios-da-compra-do-produto-contratacao-do-servico-reclamado label');
            labelFile.html( '<div class="justificado">' + $(labelFile).text() + '</div>' );
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
              $('.pfg-form.formid-formularios input[type="submit"]').css('opacity','0.4').prop( "disabled", true );
              setTimeout( function(){
                $('.pfg-form.formid-formularios input[type="submit"]').css('opacity','1').prop( "disabled", false );
              }  , 2000 );
              thisForm = this;
              $(".formid-formularios form textarea:visible, .formid-formularios form input:visible").not('#cnpj-cpf, #complemento, #inscricao-estadual, #matricula-codigo, #especificar-comprou, #informe-como-foi-o-seu-contato-com-a-empresa-indique-o-s-numero-s-de-protocolo-s-caso-o-s-possua-1,#informe-como-foi-o-seu-contato-com-a-empresa-indique-o-s-numero-s-de-protocolo-s-caso-o-s-possua-1, #g-recaptcha-response, #site, #informe-por-que-voce-nao-procurou-a-empresa-para-resolver-o-seu-problema-1, #quantidade-de-parcelas-clique-ou-toque-aqui-para-inserir-o-texto, #valor-da-parcela-clique-ou-toque-aqui-para-inserir-o-texto').each(function(){
                if($(this).val() === ''){
                  $('.formid-formularios form input:text').removeClass('error');
                  $(this).addClass('error');
                  //$('html,body').animate({ scrollTop: $('.error').offset().top - 40}, 'slow');
                  if (!$('#hasErrors').length) {
                      $('<span id="hasErrors">Por favor, corrija os campos em vermelho para enviar o formulário</span>').insertBefore($('.pfg-form.formid-formularios input[type="submit"]')).effect("pulsate", { times:2 }, 2000);
                  }
                  event.preventDefault();
                  return false;
                }
              });
              if($('.contentLightbox input').prop('checked')==false) {
                $('.contentLightbox').css('border','1px solid red');
                AdicionaMensagemErro($('.contentLightbox input'), 'Você deve ler os termos de uso e a política de privacidade do site e assinalar a caixa de seleção.')
                event.preventDefault();
                return false;
              }
              if (!$("#o-produto-ou-servico-foi-pago-por-voce-no-seu-cpf_1:checked").is(":checked") && !$("#o-produto-ou-servico-foi-pago-por-voce-no-seu-cpf_2:checked").is(":checked")){
                $('<span id="hasErrors">Por favor, corrija os campos em vermelho para enviar o formulário</span>').insertBefore($('.pfg-form.formid-formularios input[type="submit"]')).effect("pulsate", { times:2 }, 2000);
                $('#o-produto-ou-servico-foi-pago-por-voce-no-seu-cpf .formQuestion').addClass('error');
                event.preventDefault();
                return false;
              }
              $(thisForm).submit();
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
    if ($('body').hasClass('template-login_form') || $('body').hasClass('template-logged_out')) {
      //MASCARA CPF CNPJ NO LOGIN
      // $('#cnpj-cpf').parent().find('label').html('CNPJ:');
      $('#__ac_name').parent().prepend('<input type="radio" name="pessoa" value="juridica" id="rjuridica_login" checked /><span class="rpessoa">Pessoa Jurídica</span><input type="radio" name="pessoa" value="fisica" id="rfisica_login" /><span class="rpessoa">Pessoa Física</span>')
      $(document).on('click','#rfisica_login', function(){
          $('#__ac_name').parent().find('label').html('CPF:');
          $("#__ac_name").removeClass('CNPJ').addClass('CPF').mask("999.999.999-99",{placeholder:""});
      });

      $(document).on('click','#rjuridica_login', function(){
          $('#__ac_name').parent().find('label').html('CNPJ:');
          $("#__ac_name").removeClass('CPF').addClass('CNPJ').mask("99.999.999/9999-99",{placeholder:""});
      });
      $('#rfisica_login').click();
    }


    if ($('body').hasClass('userrole-reviewer') && ($('body').hasClass('template-login_success'))) {
       window.location.replace(portal_url + '/@@buscar_reclamacoes');
    }

    if ($('body').hasClass('userrole-anonymous') && ($('body').hasClass('subsection-formulario-de-denuncia'))){
         window.location.replace(portal_url + '/@@register');
    }


    if ($('body').hasClass('subsection-adesao-ao-procon-paulistano')) {
      labelFile = $('#archetypes-fieldname-anexe-arquivos-como-contrato-social-ou-outros-documentos-de-empresa label');
      labelFile.html( '<div class="justificado">' + $(labelFile).text() + '</div>' );
      insereInputFile();
      $('.infoUpload').append('<span class="required" title="Obrigatório">&nbsp;</span>');

      $(document).on('blur', '.formid-adesao-ao-procon-paulistano form', function() {
        var emailReg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
           var emailaddress = $("#e-mail-do-responsavel-pela-area-de-atendimento-ao-cliente").val();
           if(!emailReg.test(emailaddress)) {
              $('#e-mail-do-responsavel-pela-area-de-atendimento-ao-cliente').addClass('error');
            }
           else{
              $('#e-mail-do-responsavel-pela-area-de-atendimento-ao-cliente').removeClass('error');
            }

            var emailaddressj = $("#email--juridico").val();
           if(!emailReg.test(emailaddressj)) {
              $('#email--juridico').addClass('error');
            }
           else{
              $('#email--juridico').removeClass('error');
            }

            var emailaddressr = $("#e-mail-para-recebimento-de-notificacoes-eletronicas-e-mail").val();
           if(!emailReg.test(emailaddressr)) {
              $('#e-mail-para-recebimento-de-notificacoes-eletronicas-e-mail').addClass('error');
            }
           else{
              $('#e-mail-para-recebimento-de-notificacoes-eletronicas-e-mail').removeClass('error');
            }
      })
    }

    if ($('body').hasClass('subsection-formulario-de-denuncia')) {
      insereInputFile();
      $('.infoUpload').html('Até 5 arquivos, com até 20 MB de tamanho.');
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


      // $('<div class="usuario-ativo"><span>logado como: <strong>'+currentUser+'</strong> | <a href="'+portal_url+'/logout">sair</a></span></div>').insertBefore($("input[name='form_submit']"));
       lightboxForm();
       lightboxFormPolitica();
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

      $('.btnProsseguir').click(function(){
          var protocoloConsumidor = $('.divProtocolo .inputProtocolo').val();
          $('#content #content-core').append(itensForm);
          $('.form-group').addClass('active');
          $('.divRedireciona').slideUp();
          $('#archetypes-fieldname-protocoloconsumidor input').val(protocoloConsumidor)
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
      $('#content').html('<div class="form-group active" style="display:block"></div><div class="form-group2 active" style="display:block"></div><div class="form-group sucesso" style="display:block"><div class="sucessoReclamacao" style="display:block"><p><strong>Sua reclamação foi enviada com sucesso!</strong></p><p>O número de seu atendimento é:</p><span class="numeroProtocolo">'+protocoloNumber+'</span><p>Guarde o número de seu protocolo. Ele é a garantia do registro de sua reclamação</p><p>Esclarecemos que a cada andamento de sua reclamação, comunicaremos você por e-mail.</p></div></div>');
    }

    //VALIDA FORM DENUNCIA
    $(".formid-formulario-de-denuncia form").submit(function( event ) {
      if($('.contentLightbox input').prop('checked')==false) {
        event.preventDefault();
        $('.contentLightbox').css('border','1px solid red');
          AdicionaMensagemErro($('.contentLightbox input'), 'Você deve ler os termos de uso e a política de privacidade do site e assinalar a caixa de seleção.')
          return false;
      }
    });

    //CARREGA O NUMERO DE PROTOCOLO NA PAGINA DE OBRIGADO DO FORMULÁRIO DENUNCIA
    if ($('body').hasClass('template-fg_thankspage_view_p3') && $('body').hasClass('subsection-formulario-de-denuncia')){

      var protocoloNumber = $( "dl dd:last-child" ).text();
      //var itensObrigado = $("#content").detach();
      $('#content').html('<div class="sucessoReclamacao" style="display:block"><h1 id="parent-fieldname-title" class="documentFirstHeading">Formulário de denúncia</h1><p>Prezado consumidor!</p><p>Sua denúncia foi registrada com sucesso.</p><p>O seu relato foi encaminhado à Divisão de Fiscalização para análise e adoção das providências cabíveis.</p><p><strong>Agradecemos sua colaboração.</strong></p><p>PROCON Paulistano</p></div>');
    }


    //CARREGA MENSAGEM DE OBRIGADO DO FORMULÁRIO FORNECEDOR
    if ($('body').hasClass('template-fg_thankspage_view_p3') && $('body').hasClass('subsection-adesao-ao-procon-paulistano')){

      var protocoloNumber = $( "dl dd:last-child" ).text();
      //var itensObrigado = $("#content").detach();
      $('#content').html('<div class="sucessoReclamacao" style="display:block"><h1 id="parent-fieldname-title" class="documentFirstHeading">Adesão ao Procon Paulistano</h1><h2>O formulário de adesão e respectivos documentos foram enviados com sucesso.</h2><p>Após a recepção e análise da documentação, o PROCON Paulistano encaminhará, através do e-mail <a href="mailto:cid.procon@prefeitura.sp.gov.br">cid.procon@prefeitura.sp.gov.br</a>, o usuário e senha para acesso ao sistema, bem como o manual para a sua utilização.</p><p>Ficamos à disposição, no e-mail <a href="mailto:cid.procon@prefeitura.sp.gov.br">cid.procon@prefeitura.sp.gov.br</a>, para esclarecer eventuais dúvidas.</p></div>');
    }


    //CARREGA MENSAGEM DE OBRIGADO DO FORMULÁRIO FORNECEDOR
    if ($('body').hasClass('template-fg_thankspage_view_p3') && $('body').hasClass('section-contato')){
      //var itensObrigado = $("#content").detach();
      $('#content').html('<div class="sucessoReclamacao" style="display:block"><h1 id="parent-fieldname-title" class="documentFirstHeading">Obrigado</h1><p>Sua mensagem foi enviada com sucesso para a Administração do site.</p><p>Em breve, entraremos em contato.</p></div>');
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
                $('.pfg-form.formid-formularios').remove();
                $('.divRedireciona').slideDown();
                $('.form-group .btnBuscar').hide();

                $('.form-group').addClass('active');
                var itensForm = $(".formDuvidas").detach();
                return false;
              },
              open: function(event, ui){
                $('.form-group .btnBuscar').addClass('disabled');
                $('.form-group #project').removeClass('loading');
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
          var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i");
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
      });

    });

    $(".template-buscar_fornecedores #enviarComentario, .template-buscar_denuncias #enviarComentario").on('click',function(){
        if ($('body').hasClass('template-buscar_fornecedores')) {
          area = 'fornecedores'
        } else {
          area = 'denuncias'
        }
        $.post( portal_url + '/@@atualiza_forms',
        {
            objId: $(this).parent().attr('rel'),
            campo: 'observacao',
            valor: $("#enviarObservacao", $(this).parent()).val(),
            area: area
        }).done(function(){
          $('#enviarObservacao', $(this).parent()).attr('disabled',true)
        })
        location.reload();
    });

    $(".template-buscar_fornecedores #enviarTratativas").on('blur',function(){
        area = 'fornecedores'
        thisItem = $(this)
        $.post( portal_url + '/@@atualiza_forms',
        {
            objId: $(thisItem).attr('rel'),
            campo: 'tratativas',
            valor: $(thisItem).val(),
            area: area
        })
    });

    $(".template-buscar_fornecedores #lido, .template-buscar_denuncias #lido").on('click',function(){
      var r = confirm("Você tem certeza? Não será permitido desfazer essa operação.");
      if (r == true) {
        if ($('body').hasClass('template-buscar_fornecedores')) {
          area = 'fornecedores'
        } else {
          area = 'denuncias'
        }
        var thisParent = $(this).parent().parent().parent().parent();
        var objId = $(thisParent).attr('rel');
        var campo = 'lido';
        var value = 'True';
        if(objId != ''){
          $.post( portal_url + '/@@atualiza_forms',
          {
              objId: objId,
              campo: campo,
              valor: value,
              area: area
          }).done(function(){
            $('input[type=checkbox]', thisParent).attr('checked',true);
            $('input[type=checkbox]', thisParent).attr('disabled',true);
          })
        }
      }
    });

    // ABRE TELA INTERNA DA TABELA DE RECLAMAÇÕES
    $(document).on('click',"td.reclamacao_buscar",function(){
      $this  = $(this);
      thisParent = $(this).parent()

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
              $('td, th').hide();
            };
          }
        });
      $('.detalhesDuvida', thisParent).show();
      $('.detalhesDuvida', thisParent).parent().show();
      $('td.td_interno').show().css('background-color','white');
      $(".filtrarPor").hide();
    });

    $(document).on('click',"td.duvidas_buscar",function(){

      $(".DuvidaDivInterno").show();
      $(".divReclamacoes").hide();
      $this = $(this).attr("class");
      var _id = $this.split('_')[0];
      $(this).parent().addClass('ok');
      var $observacao = $("."+_id+"_observacao").html().trim();
      var $categoria = $("."+_id+"_categoria").html();
      var $data = $("."+_id+"_datas").html();
      var $usuario = $("."+_id+"_usuario").html();
      var $pergunta = $("."+_id+"_pergunta").html();
      var $resposta = $("."+_id+"_resposta").html();
      var $mensagem = $("."+_id+"_mensagem").html();
      var $assunto = $("."+_id+"_assunto").html();
      var $operador = $("."+_id+"_operador").html().trim();
      var $fullname = $("."+_id+"_fullname").html();
      var $prioridade = $("."+_id+"_prioridade").html();
      var $id = $("."+_id+"_id").html();
      var $lido = $("."+_id+"_lido").html().trim();
      var $data_atualizacao = $("."+_id+"_data_atualizacao").html();
      var $status = $("."+_id+"_status").html().trim();


      console.log($("."+_id+"_pr1").html());
      console.log($("."+_id+"_pr2").html());
      console.log($("."+_id+"_pr3").html());


      $("#column1").html($data);
      $("#column2").html($("."+_id+"_usuario").html());
      $("#column3").html($("."+_id+"_email").html());
      $("#column4").html($("."+_id+"_cpf").html());
      $("#column5").html($("."+_id+"_pr1").html());
      $("#column6").html($("."+_id+"_pr2").html());
      $("#column7").html($("."+_id+"_pr3").html());


      // // tela interna
      // $("#nome").html($("."+_id+"_nome").html().trim());
      // $("#email").html($("."+_id+"_email").html().trim());
      // $("#cpf").html($("."+_id+"_cpf").html().trim());
      // $("#pr1").html($("."+_id+"_pr1").html().trim());
      // $("#pr2").html($("."+_id+"_pr2").html().trim());
      // $("#pr3").html($("."+_id+"_pr3").html().trim());

      var $cpf = $("."+_id+"_cpf").html();
      var $municipio = $("."+_id+"_municipio").html();
      var $uf = $("."+_id+"_uf").html();

      if($observacao !== ""){
        $("#observacao").html($observacao).attr('disabled',true);
      } else {
        $("#observacao").html($observacao).attr('disabled',false);
      }
      $('#duvidas_status option[value="'+$status+'"]').attr('selected','selected');

      if($lido == "True"){
        $("#lido_check").attr('disabled',true).attr("checked",true);
        $("#texto").html('Concluído');
      } else{
        $("#lido_check").attr('disabled',false).attr("checked",false);
        $("#texto").html('Marcar como concluído');
      }
      $("#cpf").html($cpf);
      $("#municipio").html($municipio);
      $("#uf").html($uf);
      $("#status").html($status);

      $("#lido_check").attr('rel',_id);

      $("#tbl2").html($categoria);
      $("#tbl1").html($data);
      $("#tbl3").html($usuario);
      $("#pergunta").html($pergunta);
      $("#resposta").html($resposta);
      $("#mensagem").html($mensagem);
      $("#assunto").html($assunto);
      $("#idObservacao").html(_id);
      $("#fullname").html($usuario);
      $("#prioridade").html($prioridade);
      $("#operador").html($fullname);
      $("#data_atualizacao").html($data_atualizacao);
      if ($operador == "False") {
        $('.atualizacao').remove()
      }
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

              // te
              // $.post( url,
              // {
              //     util: util,
              //     plone_id: plone_id,
              //     pergunta: pergunta,
              //     resposta: resposta,
              //     usuario:usuario,
              //     categoria:categoria
              // }).done(function(){
                $('.mensagem_enviada', $('input.flashMessage').removeClass('flashMessage').parent().parent()).html("");
                $('.mensagem_enviada', $('input.ok').removeClass('ok').addClass('flashMessage').parent().parent()).append("<b>"+ $('.agradece', parent_div).text() +"</b>");
              // });
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
                  $('.mensagem_enviada', $('input.ok').removeClass('ok').parent().parent()).append("<b>"+ $('.agradece', parent_div).text() +"</b>");
                })
              });
            }
        })

        $(".lido_reclamacoes").on('click',function(){
          var r = confirm("Você tem certeza? Não será permitido desfazer essa operação.");
          if (r == true) {

            var protocolo =  $(this).attr('rel');

            if(protocolo != ""){
              $.post( portal_url + '/@@reclamacoes_salvar',
              {
                  protocolo: protocolo,
              }).done(function(){
                $('input[type=checkbox]').attr('checked',true);
                $('input[type=checkbox]').attr('disabled',true);
              })
            }
          }
        });

        $(".FA_reclamacoes").on('blur',function(){
          if ($(this).val() != "") {
            var protocolo =  $(this).attr('rel');
            var FA = $(this).val();
            if(protocolo != ""){
              $.post( portal_url + '/@@atualizar_reclamacao',
              {
                  protocolo: protocolo,
                  FA: FA,
              }).done(function(){
                $(this).attr('disabled',true);
              })
            }
          }
        });

        $(".lido").on('click',function(){
          var r = confirm("Você tem certeza? Não será permitido desfazer essa operação.");

          if (r == true) {
            var protocolo =  $(this).attr('rel');

            $.post( portal_url + '/@@duvidas_salvar',
            {
                identificacao: protocolo,
            }).done(function(){
              $('input[type=checkbox]').attr('checked',true);
              $('input[type=checkbox]').attr('disabled',true);

            })
          } else {
            $('input[type=checkbox].ok').attr('checked',false);
          }
        });

        $("#enviarComentario").on('click',function(){
            $.post( portal_url + '/@@duvidas_salvar',
            {
                identificacao: $("#idObservacao").html(),
                observacao: $("#observacao").val() ,
                status: $("#duvidas_status").val()
            }).done(function(){
              //$('#observacao').attr('disabled',true);
            })
        });

        $('#table_id').dataTable( {
        "aoColumns": [
        null,
        { "sType": "date-uk" },
        null,
        null,
        null,
        null,
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

function testaCNPJ(cnpj) {
    if(cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

     if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;

    return true;

}

function testaCPF(strCPF) {

  if (strCPF.length != 11 ||
          strCPF == "00000000000" ||
          strCPF == "11111111111" ||
          strCPF == "22222222222" ||
          strCPF == "33333333333" ||
          strCPF == "44444444444" ||
          strCPF == "55555555555" ||
          strCPF == "66666666666" ||
          strCPF == "77777777777" ||
          strCPF == "88888888888" ||
          strCPF == "99999999999")
              return false;
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
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

function limpaCEPInputs() {
    $('#form-widgets-logradouro').val("");
    $('#form-widgets-bairro').val("");
}

function CEPCallback(conteudo) {
  if (!("erro" in conteudo)) {
    $('#form-widgets-logradouro').val(conteudo.logradouro);
    $('#form-widgets-bairro').val(conteudo.bairro);
  }
  else {
    limpaCEPInputs();
    alert("CEP não encontrado.");
  }
}

function pesquisaCEP(cep) {
  if ((cep != "") && (01000000 < CEP && 05999999 > CEP ))  {
    var validacep = /^[0-9]{8}$/;
    if(validacep.test(cep)) {
      $('#form-widgets-logradouro').val("...");
      $('#form-widgets-bairro').val("...");
      var script = document.createElement('script');
      script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=CEPCallback';
      document.body.appendChild(script);
      return true
    }
    else {
      limpaCEPInputs();
      alert("Formato de CEP inválido.");
    }
  }
  else {
    limpaCEPInputs();
    alert('CEP inválido')
    return false;
  }
};

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

function validatedate(txt) {
    var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    // Match the date format through regular expression
    if (txt.match(dateformat)) {

        //Test which seperator is used '/' or '-'
        var opera1 = txt.split('/');
        var opera2 = txt.split('-');
        lopera1 = opera1.length;
        lopera2 = opera2.length;
        // Extract the string into month, date and year
        if (lopera1 > 1) {
            var pdate = txt.split('/');
        } else if (lopera2 > 1) {
            var pdate = txt.split('-');
        }
        var mm = parseInt(pdate[0]);
        var dd = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);
        // Create list of days of a month [assume there is no leap year by default]
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
               // alert('Data Invalida!');
                return false;
            }
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }

            if ((lyear == false) && (dd >= 29)) {
                //alert('Data Invalida!');
                return false;
            }

            if ((lyear == true) && (dd > 29)) {
                //alert('Data Invalida!');
                return false;
            }
        }

    } else {
        //alert('Data Invalida!');

        return false;
    }
}

//COMPARA DATAS
function compareDates(date1, date2){
      //checaMaiorQAmanha(date2);
      var int_date1 = parseInt(date1.split("/")[2].toString() + date1.split("/")[1].toString() + date1.split("/")[0].toString());
      var int_date2 = parseInt(date2.split("/")[2].toString() + date2.split("/")[1].toString() + date2.split("/")[0].toString());

      //if(!checaMaiorQAmanha(date2)){
        //$('#quando-o-produto-ou-servico-apresentou-problema').val('');
        //return false;
      //}

      if (int_date1 > int_date2){
          $('#quando-o-produto-ou-servico-apresentou-problema').val('');
          alert("Esta data precisa ser superior a data da compra/contrato do produto/serviço.");
      }
      return false;
  }

function checaMaiorQAmanha(data) {
 //data para checar
    var str = data.split("/");
    var diacheck = str[0];
    var mescheck = str[1];
    var anocheck = str[2];

    var diaparachecar = Date.parse(mescheck + "/" + diacheck + "/" + anocheck);

  // if(isNaN(Date.parse(mescheck+"/"+diacheck+"/"+anocheck))){
  //   alert("Data Inválida!");
  //   $('#quando-voce-comprou-o-produto-ou-contratou-o-servico-1').val('');
  //   $('#quando-voce-comprou-o-produto-ou-contratou-o-servico-1').val('');
  //   return;
  // }

    if(validatedate(data)===false){
        alert("Data Inválida!");
        $('#quando-voce-comprou-o-produto-ou-contratou-o-servico-1').val('');
        $('#quando-voce-comprou-o-produto-ou-contratou-o-servico-1').val('');
        return;
    }else{
    }

    //recupera o valor de hj
    var hj = new Date();
    var hjdia = hj.getDate();
    var hjmes = hj.getMonth();
    var hjano = hj.getFullYear();

    //hj em miliseconds desde Jan 1 1970
    //parse(mes/dia/ano)
    var hjemmili = Date.parse((hjmes + 1) + "/" + hjdia + "/" + hjano);


    //console.log((hjmes + 1)+" "+ hjdia+", "+hjano);

    //amanha
    var amanha = new Date(hjemmili + (86400000 * 1));

    var amanhamili =  amanha.getTime();






    //se a data for amanha ou outro dia depois de manha, não permita
     if(amanhamili > diaparachecar){
        return true;

    }else{
      //console.log('entrouuuu.')
      //$('#quando-o-produto-ou-servico-apresentou-problema').val('');
      //alert("Não é possivel inserir esta data");
      return false;

    }


}
