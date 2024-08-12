function openCalc(evt, calcName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("calc");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
    }
    document.getElementById(calcName).style.display = "block";
    evt.currentTarget.className += " w3-red";
}

function calcularPRI() {
    const dt30 = new Date("December 31, 2021");
    const dt40 = new Date("February 28, 2023");

    var dtini = new Date(document.getElementById('dtiniPRI').value);
    var dtvenc = new Date(document.getElementById('dtvencPRI').value);
    var ISS = parseFloat(document.getElementById('ISSPRI').value.replace(",", "."));
    var mens = parseFloat(document.getElementById('mensPRI').value.replace(/\./g, "").replace(",", "."));
    var IR = document.getElementById('IRPRI').value;
    var PCC = document.getElementById('PCCPRI').value;
    var Fin = document.getElementById('FinPRI').value;

    var qtdias = Math.ceil(Math.abs(dtvenc - dtini) / (1000 * 60 * 60 * 24));
    var VlISS = (ISS / 100) * (mens / 30 * qtdias);
    var VlIR = IR * 0.01 * (mens / 30 * qtdias);
    var VlPCC = PCC * 0.0465 * (mens / 30 * qtdias);
    var VlFin = 0;
    if (dtini <= dt30) {
        VlFin = Fin * 30;
    } else if (dtini <= dt40) {
        VlFin = Fin * 40;
    } else {
        VlFin = Fin * 50;
    }
    var VlPag = (mens / 30 * qtdias) - VlISS - VlIR - VlPCC + VlFin;

    document.getElementById('qtdiasPRI').value = qtdias;
    VlISS = VlISS.toFixed(2).replace(".", ",");
    document.getElementById('VlISSPRI').value = VlISS.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    VlIR = VlIR.toFixed(2).replace(".", ",");
    document.getElementById('VlIRPRI').value = VlIR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    VlPCC = VlPCC.toFixed(2).replace(".", ",");
    document.getElementById('VlPCCPRI').value = VlPCC.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    VlFin = VlFin.toFixed(2).replace(".", ",");
    document.getElementById('VlFinPRI').value = VlFin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    VlPag = VlPag.toFixed(2).replace(".", ",");
    document.getElementById('VlPagPRI').value = VlPag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calcularPRC() {
    var dtcanc = new Date(document.getElementById('dtcancPRC').value);
    var dtvenc = new Date(document.getElementById('dtvencPRC').value);
    var ISS = parseFloat(document.getElementById('ISSPRC').value.replace(",", "."));
    var mens = parseFloat(document.getElementById('mensPRC').value.replace(/\./g, "").replace(",", "."));
    var sva = parseFloat(document.getElementById('svaPRC').value.replace(/\./g, "").replace(",", "."));
    var IR = document.getElementById('IRPRC').value;
    var PCC = document.getElementById('PCCPRC').value;

    var dtfin = new Date(dtcanc.getTime() + 30 * (1000 * 60 * 60 * 24) + 3 * (1000 * 60 * 60));
    var dtaux = new Date(dtvenc.getTime() - 31 * (1000 * 60 * 60 * 24) + 3 * (1000 * 60 * 60));
    var dtv2 = new Date(dtvenc.getTime() + 3 * (1000 * 60 * 60));
    var qtdias = Math.ceil(Math.abs(dtfin - dtaux) / (1000 * 60 * 60 * 24));
    var VlISS = (ISS / 100) * (mens / 30 * qtdias);
    var VlIR = IR * 0.01 * (mens / 30 * qtdias);
    var VlPCC = PCC * 0.0465 * (mens / 30 * qtdias);
    var VlPag = (mens / 30 * qtdias) - VlISS - VlIR - VlPCC + sva;
    var VlRee = mens - (VlPag - sva);

    document.getElementById('qtdiasPRC').value = qtdias;
    document.getElementById('dtfinPRC').value = dtfin.toLocaleString().split(',')[0];
    VlISS = VlISS.toFixed(2).replace(".", ",");
    document.getElementById('VlISSPRC').value = VlISS.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    VlIR = VlIR.toFixed(2).replace(".", ",");
    document.getElementById('VlIRPRC').value = VlIR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    VlPCC = VlPCC.toFixed(2).replace(".", ",");
    document.getElementById('VlPCCPRC').value = VlPCC.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (qtdias > 30) {
        document.getElementById('VlPagPRC').value = "TÍTULO INTEGRAL";
        document.getElementById('VlReePRC').value = "TÍTULO INTEGRAL";
        document.getElementById('txtPRC').innerHTML = "<td>Por favor, enviar dados para DI no valor do TÍTULO INTEGRAL referente ao pró-rata de cancelamento, que foi do dia " + dtfin.toLocaleString().split(',')[0] + " até " + dtv2.toLocaleString().split(',')[0] + " no e-mail:</td>";
        document.getElementById('txtReePRC').innerHTML = "<td>Por favor, enviar dados para DI no valor do TÍTULO INTEGRAL referente ao pró-rata de cancelamento, que foi do dia " + dtfin.toLocaleString().split(',')[0] + " até " + dtv2.toLocaleString().split(',')[0] + " no e-mail:</td>";

    }
    else {
        VlPag = VlPag.toFixed(2).replace(".", ",");
        VlRee = VlRee.toFixed(2).replace(".", ",");
        document.getElementById('VlPagPRC').value = VlPag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        document.getElementById('VlReePRC').value = VlRee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        document.getElementById('txtPRC').innerHTML = "<td>Por favor, enviar dados para DI no valor de R$ " + VlPag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " referente ao pró-rata de cancelamento, que foi do dia " + dtfin.toLocaleString().split(',')[0] + " até " + dtv2.toLocaleString().split(',')[0] + " no e-mail:</td>";
        document.getElementById('txtReePRC').innerHTML = "<td>Por favor, enviar dados para reembolso no valor de R$ " + VlRee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " referente a pró-rata de cancelamento cobrada a mais, dados bancários para reembolso: ";

    }
}

function calcularNM() {
    const dt30 = new Date("December 31, 2021");
    const dt40 = new Date("February 28, 2023");

    var dtini = new Date(document.getElementById('dtiniNM').value);
    var star = document.getElementById('starNM').value;
    var mens = parseFloat(document.getElementById('mensNM').value.replace(/\./g, "").replace(",", "."));
    var Fin = document.getElementById('FinNM').value;
    var porc;

    switch (star) {
        case "1":
            document.getElementById('descNM').value = "0%";
            porc = 0;
            break;
        case "2":
            document.getElementById('descNM').value = "10%";
            porc = 0.1;
            break;
        case "3":
            document.getElementById('descNM').value = "15%";
            porc = 0.15;
            break;
        case "4":
            document.getElementById('descNM').value = "20%";
            porc = 0.2;
            break;
        case "5":
            document.getElementById('descNM').value = "20%";
            porc = 0.2;
    }

    var VlFin = 0;
    if (dtini <= dt30) {
        VlFin = Fin * 30;
    } else if (dtini <= dt40) {
        VlFin = Fin * 40;
    } else {
        VlFin = Fin * 50;
    }

    var VldescmesNM = mens * porc;
    var VldescNM = 3 * VldescmesNM;
    var VlpagNM = mens - VldescmesNM + VlFin;

    VldescmesNM = VldescmesNM.toFixed(2).replace(".", ",");
    document.getElementById('VldescmesNM').value = VldescmesNM.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    VldescNM = VldescNM.toFixed(2).replace(".", ",");
    document.getElementById('VldescNM').value = VldescNM.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    VlFin = VlFin.toFixed(2).replace(".", ",");
    document.getElementById('VlFinNM').value = VlFin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    VlpagNM = VlpagNM.toFixed(2).replace(".", ",");
    document.getElementById('VlPagNM').value = VlpagNM.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    document.getElementById('txtNM').innerHTML = "<td>Favor aplicar o desconto de " + document.getElementById('descNM').value + " na mensalidade durante 3 meses. Total de desconto: R$ " + document.getElementById('VldescNM').value + " diluído em 3x de R$ " + document.getElementById('VldescmesNM').value + "</td>";
}

function copyTextPRC() {
    var Text = document.getElementById('txtPRC').innerHTML;
    Text = Text.toString().replace("<td>", "");
    Text = Text.toString().replace("</td>", "");
    navigator.clipboard.writeText(Text);
    mostrarNotificacao("TEXTO COPIADO");
}

function copyTextReePRC() {
    var Text = document.getElementById('txtReePRC').innerHTML;
    Text = Text.toString().replace("<td>", "");
    Text = Text.toString().replace("</td>", "");
    navigator.clipboard.writeText(Text);
    mostrarNotificacao("TEXTO COPIADO");
}

function copyTextNM() {
    var Text = document.getElementById('txtNM').innerHTML;
    Text = Text.toString().replace("<td>", "");
    Text = Text.toString().replace("</td>", "");
    navigator.clipboard.writeText(Text);
    mostrarNotificacao("TEXTO COPIADO");
}

function copyValorPag() {
    var valor = parseFloat(document.getElementById('VlPagPRC').value.replace(/\./g, "").replace(",", "."));
    var valorFormatado = valor.toFixed(2);
    valorFormatado = valorFormatado.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    navigator.clipboard.writeText(valorFormatado);
    mostrarNotificacao("VALOR COPIADO");
    console.log(valorFormatado);
}

function copyValorRee() {
    var valor = parseFloat(document.getElementById('VlReePRC').value.replace(/\./g, "").replace(",", "."));
    var valorFormatado = valor.toFixed(2);
    valorFormatado = valorFormatado.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    navigator.clipboard.writeText(valorFormatado);
    mostrarNotificacao("VALOR COPIADO");
    console.log(valorFormatado);
}

function limparCamposPRC() {
    document.getElementById('mensPRC').value = '0,00';
    document.getElementById('dtcancPRC').value = '';
    document.getElementById('dtvencPRC').value = '';
    document.getElementById('ISSPRC').value = '0';
    document.getElementById('IRPRC').value = '0';
    document.getElementById('PCCPRC').value = '0';
    document.getElementById('svaPRC').value = '0,00';
    document.getElementById('qtdiasPRC').value = '';
    document.getElementById('dtfinPRC').value = '';
    document.getElementById('VlISSPRC').value = '';
    document.getElementById('VlIRPRC').value = '';
    document.getElementById('VlPCCPRC').value = '';
    document.getElementById('VlPagPRC').value = '';
    document.getElementById('VlReePRC').value = '';

    document.getElementById('txtPRC').innerHTML = 'Por favor, enviar dados para DI no valor de R$ xxx,xx referente ao pró-rata de cancelamento, que foi do dia xx/xx/xxxx até yy/yy/yyyy no e-mail:';
    document.getElementById('txtReePRC').innerHTML = 'Por favor, enviar dados para reembolso no valor de R$ xxx,xx referente a pró-rata de cancelamento cobrada a mais, dados bancários para reembolso:';

    mostrarNotificacao("DADOS EXCLUÍDOS", 3000, 'w3-red', 'fa fa-trash-o');
}

function limparCamposNM() {
    document.getElementById('mensNM').value = '0,00';
    document.getElementById('starNM').value = '1';
    document.getElementById('dtiniNM').value = '';
    document.getElementById('FinNM').value = '0';

    document.getElementById('txtNM').innerHTML = 'Favor aplicar o desconto de x,xx% na mensalidade durante 3 meses. Total de desconto: R$ xx,xx diluído em 3x de R$ xx,xx';

    mostrarNotificacao("DADOS EXCLUÍDOS", 3000, 'w3-red', 'fa fa-trash-o');
}

function mostrarNotificacao(message, duration = 3000, colorClass = 'w3-green', iconClass = 'fa-check') {
    document.getElementById('notification').style.display = 'table-row';
    var notificationText = document.getElementById('notification-text');
    notificationText.textContent = message;

    var notification = document.getElementById('notification');
    var notificationIcon = notification.querySelector('i');

    notification.classList.remove('w3-green', 'w3-red', 'w3-yellow', 'w3-blue');

    notification.classList.add(colorClass);

    notificationIcon.className = `fa ${iconClass}`;

    notification.style.display = 'block';
    notification.style.opacity = 1;
    notification.style.transform = 'translateY(0)';

    setTimeout(function () {
        notification.style.opacity = 0;
        notification.style.transform = 'translateY(-20px)';

        setTimeout(function () {
            notification.style.display = 'none';
        }, 500);
    }, duration);
}

function formatarValorCampo(campo) {
    var valor = campo.value.replace(/\D/g, "");
    valor = (valor / 100).toFixed(2).replace(".", ",");
    campo.value = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function atualizarVisibilidadeCampos() {

    // Obtém o valor do botão de rádio selecionado
    var selectedValue = document.querySelector('input[name="contrato"]:checked').value;
    
    // Mostra ou oculta os campos com base na seleção
    if (selectedValue === 'fisica') {
        document.getElementById('VISSPRC').style.display = 'none';
        document.getElementById('VIRPRC').style.display = 'none';
        document.getElementById('VPCCPRC').style.display = 'none';
        document.getElementById('VRISSPRC').style.display = 'none';
        document.getElementById('VRIRPRC').style.display = 'none';
        document.getElementById('VRPCCPRC').style.display = 'none';

    } else if (selectedValue === 'juridica') {
        document.getElementById('VISSPRC').style.display = 'table-row';
        document.getElementById('VIRPRC').style.display = 'table-row';
        document.getElementById('VPCCPRC').style.display = 'table-row';
        document.getElementById('VRISSPRC').style.display = 'table-row';
        document.getElementById('VRIRPRC').style.display = 'table-row';
        document.getElementById('VRPCCPRC').style.display = 'table-row';
    }
    limparCamposPRC();
    document.getElementById('notification').style.display = 'none';
}

// Adiciona um listener para os botões de rádio
document.addEventListener('DOMContentLoaded', function() {
    var radios = document.querySelectorAll('input[name="contrato"]');
    radios.forEach(function(radio) {
        radio.addEventListener('change', atualizarVisibilidadeCampos);
    });

    // Chama a função uma vez para definir o estado inicial
    atualizarVisibilidadeCampos();
});