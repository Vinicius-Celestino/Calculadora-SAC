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

  var dtini = new Date(document.getElementById("dtiniPRI").value);
  var dtvenc = new Date(document.getElementById("dtvencPRI").value);
  var ISS = parseFloat(
    document.getElementById("ISSPRI").value.replace(",", ".")
  );
  var mens = parseFloat(
    document
      .getElementById("mensPRI")
      .value.replace(/\./g, "")
      .replace(",", ".")
  );
  var IR = document.getElementById("IRPRI").value;
  var PCC = document.getElementById("PCCPRI").value;
  var Fin = document.getElementById("FinPRI").value;

  var qtdias = Math.ceil(Math.abs(dtvenc - dtini) / (1000 * 60 * 60 * 24));
  var VlISS = (ISS / 100) * ((mens / 30) * qtdias);
  var VlIR = IR * 0.01 * ((mens / 30) * qtdias);
  var VlPCC = PCC * 0.0465 * ((mens / 30) * qtdias);
  var VlFin = 0;
  if (dtini <= dt30) {
    VlFin = Fin * 30;
  } else if (dtini <= dt40) {
    VlFin = Fin * 40;
  } else {
    VlFin = Fin * 50;
  }
  var VlPag = (mens / 30) * qtdias - VlISS - VlIR - VlPCC + VlFin;

  document.getElementById("qtdiasPRI").value = qtdias;
  VlISS = VlISS.toFixed(2).replace(".", ",");
  document.getElementById("VlISSPRI").value = VlISS.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  VlIR = VlIR.toFixed(2).replace(".", ",");
  document.getElementById("VlIRPRI").value = VlIR.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  VlPCC = VlPCC.toFixed(2).replace(".", ",");
  document.getElementById("VlPCCPRI").value = VlPCC.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,

    "."
  );
  VlFin = VlFin.toFixed(2).replace(".", ",");
  document.getElementById("VlFinPRI").value = VlFin.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  VlPag = VlPag.toFixed(2).replace(".", ",");
  document.getElementById("VlPagPRI").value = VlPag.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
}

function calcularPRC() {
  if (!validarCamposPorTipoPessoa()) {
    return;
  }

  var dtcanc = new Date(document.getElementById("dtcancPRC").value);
  var dtvenc = new Date(document.getElementById("dtvencPRC").value);
  var ISS = parseFloat(
    document.getElementById("ISSPRC").value.replace("%", "").replace(",", ".")
  );
  var mens = parseFloat(
    document
      .getElementById("mensPRC")
      .value.replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".")
  );
  var sva = parseFloat(
    document
      .getElementById("svaPRC")
      .value.replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".")
  );
  var IR = document.getElementById("IRPRC").value;
  var PCC = document.getElementById("PCCPRC").value;

  var dtfin = new Date(
    dtcanc.getTime() + 30 * (1000 * 60 * 60 * 24) + 3 * (1000 * 60 * 60)
  );
  var dtaux = new Date(
    dtvenc.getTime() - 31 * (1000 * 60 * 60 * 24) + 3 * (1000 * 60 * 60)
  );
  var dtv2 = new Date(dtvenc.getTime() + 3 * (1000 * 60 * 60));
  var qtdias = Math.ceil(Math.abs(dtfin - dtaux) / (1000 * 60 * 60 * 24));
  var VlISS = (ISS / 100) * ((mens / 30) * qtdias);
  var VlIR = IR * 0.01 * ((mens / 30) * qtdias);
  var VlPCC = PCC * 0.0465 * ((mens / 30) * qtdias);
  var VlPag = (mens / 30) * qtdias - VlISS - VlIR - VlPCC + sva;
  var VlRee = mens - (VlPag - sva);

  document.getElementById("qtdiasPRC").value = qtdias;
  document.getElementById("dtfinPRC").value = dtfin
    .toLocaleString()
    .split(",")[0];
  VlISS = VlISS.toFixed(2).replace(".", ",");
  document.getElementById("VlISSPRC").value = VlISS.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  VlIR = VlIR.toFixed(2).replace(".", ",");
  document.getElementById("VlIRPRC").value = VlIR.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  VlPCC = VlPCC.toFixed(2).replace(".", ",");
  document.getElementById("VlPCCPRC").value = VlPCC.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  if (qtdias > 30) {
    document.getElementById("VlPagPRC").value = "TÍTULO INTEGRAL";
    document.getElementById("VlReePRC").value = "TÍTULO INTEGRAL";
    document.getElementById("txtPRC").innerHTML =
      "<td class='w3-padding-small w3-round-small'>Por favor, enviar dados para DI no valor do TÍTULO INTEGRAL referente ao pró-rata de cancelamento, que foi do dia " +
      dtfin.toLocaleString().split(",")[0] +
      " até " +
      dtv2.toLocaleString().split(",")[0] +
      " no e-mail:</td>";
    document.getElementById("txtReePRC").innerHTML =
      "<td class='w3-padding-small w3-round-small'>Por favor, enviar dados para DI no valor do TÍTULO INTEGRAL referente ao pró-rata de cancelamento, que foi do dia " +
      dtfin.toLocaleString().split(",")[0] +
      " até " +
      dtv2.toLocaleString().split(",")[0] +
      " no e-mail:</td>";
  } else {
    VlPag = VlPag.toFixed(2).replace(".", ",");
    VlRee = VlRee.toFixed(2).replace(".", ",");
    document.getElementById("VlPagPRC").value = VlPag.toString().replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    );
    document.getElementById("VlReePRC").value = VlRee.toString().replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    );
    document.getElementById("txtPRC").innerHTML =
      "<td class='w3-padding-small w3-round-small'>Por favor, enviar dados para DI no valor de R$ " +
      VlPag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
      " referente ao pró-rata de cancelamento, que foi do dia " +
      dtfin.toLocaleString().split(",")[0] +
      " até " +
      dtv2.toLocaleString().split(",")[0] +
      " no e-mail:</td>";
    document.getElementById("txtReePRC").innerHTML =
      "<td class='w3-padding-small w3-round-small'>Por favor, enviar dados para reembolso no valor de R$ " +
      VlRee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
      " referente a pró-rata de cancelamento cobrada a mais, dados bancários para reembolso: </td>";
  }
}

function calcularNM() {
  const dt30 = new Date("December 31, 2021");
  const dt40 = new Date("February 28, 2023");

  var dtini = new Date(document.getElementById("dtiniNM").value);
  var star = document.getElementById("starNM").value;
  var mens = parseFloat(
    document
      .getElementById("mensNM")
      .value.replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".")
  );
  var Fin = document.getElementById("FinNM").value;
  var porc;

  switch (star) {
    case "1":
      document.getElementById("descNM").value = "0%";
      porc = 0;
      break;
    case "2":
      document.getElementById("descNM").value = "10%";
      porc = 0.1;
      break;
    case "3":
      document.getElementById("descNM").value = "15%";
      porc = 0.15;
      break;
    case "4":
      document.getElementById("descNM").value = "20%";
      porc = 0.2;
      break;
    case "5":
      document.getElementById("descNM").value = "20%";
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
  document.getElementById("VldescmesNM").value = VldescmesNM.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  VldescNM = VldescNM.toFixed(2).replace(".", ",");
  document.getElementById("VldescNM").value = VldescNM.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  VlFin = VlFin.toFixed(2).replace(".", ",");
  document.getElementById("VlFinNM").value = VlFin.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  VlpagNM = VlpagNM.toFixed(2).replace(".", ",");
  document.getElementById("VlPagNM").value = VlpagNM.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  document.getElementById("txtNM").innerHTML =
    "<td>Favor aplicar o desconto de " +
    document.getElementById("descNM").value +
    " na mensalidade durante 3 meses. Total de desconto: R$ " +
    document.getElementById("VldescNM").value +
    " diluído em 3x de R$ " +
    document.getElementById("VldescmesNM").value +
    "</td>";
}

function copyTextById(elementId) {
  var text = document.getElementById(elementId).innerHTML;
  // text = text.replace(/<td>/g, "").replace(/<\/td>/g, "");
  text = text
    .replace(/<td>/g, "")
    .replace(/<td class="w3-padding-small w3-round-small">/g, "")
    .replace(/<\/td>/g, "");
  navigator.clipboard.writeText(text);
  mostrarNotificacao("TEXTO COPIADO");
}

function copyValorResultadoPRCById(inputId) {
  var valor = parseFloat(
    document.getElementById(inputId).value.replace(/\./g, "").replace(",", ".")
  );

  var valorFormatado = valor.toFixed(2);
  valorFormatado = valorFormatado
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  navigator.clipboard.writeText(valorFormatado);

  mostrarNotificacao("VALOR COPIADO");
}

function limparCampos(dados, textos) {
  Object.keys(dados).forEach((id) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.value = dados[id];
    }
  });

  Object.keys(textos).forEach((id) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.innerHTML = textos[id];
    }
  });

  mostrarNotificacao("DADOS EXCLUÍDOS", 3000, "w3-red", "fa fa-trash-o");
}

function limparCamposPRC() {
  const dadosPRC = {
    mensPRC: "R$ 0,00",
    dtcancPRC: "",
    dtvencPRC: "",
    ISSPRC: "0%",
    IRPRC: "",
    PCCPRC: "",
    svaPRC: "R$ 0,00",
    qtdiasPRC: "",
    dtfinPRC: "",
    VlISSPRC: "",
    VlIRPRC: "",
    VlPCCPRC: "",
    VlPagPRC: "",
    VlReePRC: "",
    mensPAGA: "",
    JoinvillePRC: "",
  };

  const textosPRC = {
    txtPRC:
      "<td class='w3-padding-small w3-round-small'>Por favor, enviar dados para DI no valor de R$ xxx,xx referente ao pró-rata de cancelamento, que foi do dia xx/xx/xxxx até yy/yy/yyyy no e-mail:</td>",
    txtReePRC:
      "<td class='w3-padding-small w3-round-small'>Por favor, enviar dados para reembolso no valor de R$ xxx,xx referente a pró-rata de cancelamento cobrada a mais, dados bancários para reembolso:</td>",
  };

  limparCampos(dadosPRC, textosPRC);
  mensalidadePaga();
  visibilidadeJoinville();
}

function limparCamposNM() {
  const dadosNM = {
    mensNM: "R$ 0,00",
    starNM: "1",
    dtiniNM: "",
    FinNM: "0",
  };

  const textosNM = {
    txtNM:
      "Favor aplicar o desconto de x,xx% na mensalidade durante 3 meses. Total de desconto: R$ xx,xx diluído em 3x de R$ xx,xx",
  };

  limparCampos(dadosNM, textosNM);
}

function mostrarNotificacao(
  message,
  duration = 3000,
  colorClass = "w3-green",
  iconClass = "fa-check"
) {
  document.getElementById("notification").style.display = "table-row";
  var notificationText = document.getElementById("notification-text");
  notificationText.textContent = message;

  var notification = document.getElementById("notification");
  var notificationIcon = notification.querySelector("i");

  notification.classList.remove("w3-green", "w3-red", "w3-yellow", "w3-blue");

  notification.classList.add(colorClass);

  notificationIcon.className = `fa ${iconClass}`;

  notification.style.display = "block";
  notification.style.opacity = 1;
  notification.style.transform = "translateY(0)";

  setTimeout(function () {
    notification.style.opacity = 0;
    notification.style.transform = "translateY(-20px)";

    setTimeout(function () {
      notification.style.display = "none";
    }, 500);
  }, duration);
}

function formatarValorCampo(campo) {
  var valor = campo.value.replace(/\D/g, "");
  valor = (valor / 100).toFixed(2).replace(".", ",");
  campo.value = "R$ " + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatarPercentualCampo(campo) {
  var valor = campo.value.replace(/[^0-9,]/g, "");
  valor = valor.replace(/,+/g, ",");
  campo.value = valor + "%";
}

function atualizarVisibilidadeCampos() {
  var selectedValue = document.querySelector(
    'input[name="contrato"]:checked'
  ).value;

  var ids = [
    "VISSPRC",
    "VIRPRC",
    "VPCCPRC",
    "VRISSPRC",
    "VRIRPRC",
    "VRPCCPRC",
    "VJoinvillePRC",
  ];

  ids.forEach(function (id) {
    document.getElementById(id).style.display =
      selectedValue === "juridica" ? "table-row" : "none";
  });

  limparCamposPRC();
  document.getElementById("notification").style.display = "none";
}

function mensalidadePaga() {
  const valorSelecionado = document.getElementById("mensPAGA").value;
  const debitoIdentificado = document.getElementById("TRVlPagPRC");
  const reembolso = document.getElementById("TRVlReePRC");
  const resultado = document.getElementById("Resultado");
  const blocoDI = document.getElementById("blocoEnvioDI");
  const blocoReembolso = document.getElementById("blocoReembolso");

  if (valorSelecionado === "") {
    debitoIdentificado.classList.add("w3-hide");
    reembolso.classList.add("w3-hide");
    resultado.classList.remove("w3-hide");
    blocoDI.classList.add("w3-hide");
    blocoReembolso.classList.add("w3-hide");
  } else {
    resultado.classList.add("w3-hide");
    valorSelecionado === "0"
      ? (debitoIdentificado.classList.remove("w3-hide"),
        reembolso.classList.add("w3-hide"),
        blocoDI.classList.remove("w3-hide"),
        blocoReembolso.classList.add("w3-hide"))
      : (debitoIdentificado.classList.add("w3-hide"),
        reembolso.classList.remove("w3-hide"),
        blocoDI.classList.add("w3-hide"),
        blocoReembolso.classList.remove("w3-hide"));
  }
}

function visibilidadeJoinville() {
  const tipoPessoa = document.querySelector(
    'input[name="contrato"]:checked'
  ).value;

  const visibilidadeISS = document.getElementById("VISSPRC");
  const visibilidadeIR = document.getElementById("VIRPRC");
  const visibilidadePCC = document.getElementById("VPCCPRC");

  if (tipoPessoa === "juridica") {
    visibilidadeISS.classList.remove("w3-hide");
    visibilidadeIR.classList.remove("w3-hide");
    visibilidadePCC.classList.remove("w3-hide");
  }
}

function controlarVisibilidadeCampos() {
  const tipoPessoa = document.querySelector(
    'input[name="contrato"]:checked'
  ).value;
  const joinville = document.getElementById("JoinvillePRC").value;

  const idsCampos = ["VISSPRC", "VIRPRC", "VPCCPRC"];

  if (tipoPessoa === "juridica") {
    if (joinville === "0") {
      idsCampos.forEach((id) => {
        document.getElementById(id).classList.remove("w3-hide");
      });
    } else if (joinville === "1") {
      idsCampos.forEach((id) => {
        document.getElementById(id).classList.add("w3-hide");
        document.getElementById(id.replace("V", "")).value =
          id === "VISSPRC" ? "0" : "";
      });
    }
  }
}

function obterCamposPorTipoPessoa(tipoPessoa, joinville) {
  let camposParaValidar = [];

  if (tipoPessoa === "fisica") {
    camposParaValidar = ["mensPAGA", "mensPRC", "dtcancPRC", "dtvencPRC"];
  } else if (tipoPessoa === "juridica") {
    camposParaValidar = [
      "mensPAGA",
      "mensPRC",
      "JoinvillePRC",
      "dtcancPRC",
      "dtvencPRC",
    ];

    if (joinville === "0") {
      camposParaValidar.push("ISSPRC", "IRPRC", "PCCPRC");
    }
  }

  return camposParaValidar;
}

const nomesCampos = {
  mensPAGA:
    "A mensalidade a ser calculada foi paga? <i class='fa fa-close' style='color:red'></i>",
  mensPRC: "Valor da mensalidade <i class='fa fa-close' style='color:red'></i>",
  JoinvillePRC:
    "A nota é de Joinville? <i class='fa fa-close' style='color:red'></i>",
  dtcancPRC:
    "Data de solicitação de cancelamento <i class='fa fa-close' style='color:red'></i>",
  dtvencPRC:
    "Data de vencimento do título <i class='fa fa-close' style='color:red'></i>",
  IRPRC: "Tem retenção de IR? <i class='fa fa-close' style='color:red'></i>",
  PCCPRC: "Tem retenção de PCC? <i class='fa fa-close' style='color:red'></i>",
};

function validarCampos(ids) {
  let camposVazios = [];

  for (let id of ids) {
    const elemento = document.getElementById(id);

    if (elemento && (elemento.value === "" || elemento.value === "R$ 0,00")) {
      const nomeCampo = nomesCampos[id] || id;
      camposVazios.push(nomeCampo);
    }
  }

  if (camposVazios.length > 0) {
    const mensagem =
      "<p><b>Os seguintes campos não foram preenchidos:</b><p>" +
      camposVazios.join("<br>");
    document.getElementById("mensagemCamposVazios").innerHTML = mensagem;
    document.getElementById("modalCamposPreenchidos").style.display = "block";
    return false;
  }

  return true;
}

function validarCamposPorTipoPessoa() {
  const tipoPessoa = document.querySelector(
    'input[name="contrato"]:checked'
  ).value;
  const joinville = document.getElementById("JoinvillePRC").value;

  const camposParaValidar = obterCamposPorTipoPessoa(tipoPessoa, joinville);

  if (!validarCampos(camposParaValidar)) {
    document.getElementById("modalCamposPreenchidos").style.display = "block";
    return false;
  }

  return true;
}

function fecharModal() {
  document.getElementById("modalCamposPreenchidos").style.display = "none";
}

function fecharModal() {
  document.getElementById("modalCamposPreenchidos").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  var radios = document.querySelectorAll('input[name="contrato"]');
  radios.forEach(function (radio) {
    radio.addEventListener("change", atualizarVisibilidadeCampos);
  });

  atualizarVisibilidadeCampos();
});

/* Desenvolvido por Luis Roberto Cerqueira Campos e Vinícius Sousa Celestino*/
