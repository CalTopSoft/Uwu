import { casas } from './bd.js';

document.addEventListener('DOMContentLoaded', () => {
  const selectCasa = document.getElementById('selectCasa');
  casas.forEach(casa => {
    const opt = document.createElement('option');
    opt.value = casa.id;
    opt.textContent = casa.nombre;
    selectCasa.appendChild(opt);
  });

  selectCasa.addEventListener('change', () => {
    const casa = casas.find(c => c.id == selectCasa.value);
    if (casa) {
      document.getElementById('banos').value = casa.banos;
      document.getElementById('dormitorios').value = casa.dormitorios;
      document.getElementById('precio').value = casa.precio;
      document.getElementById('metros').value = casa.metros;
    }
  });
});

window.calcularCuotas = function() {
  const precio = parseFloat(document.getElementById('precio').value);
  const entrada = parseFloat(document.getElementById('entrada').value);
  const tasa = parseFloat(document.getElementById('tasa').value) / 100;
  const meses = parseInt(document.getElementById('meses').value);

  const saldo = precio - entrada;
  const tasaMensual = tasa / 12;
  const cuotaMensual = saldo * (tasaMensual / (1 - Math.pow(1 + tasaMensual, -meses)));

  document.getElementById('cuotaEntrada').value = entrada.toFixed(2);
  document.getElementById('saldo').value = saldo.toFixed(2);
  document.getElementById('cuotaMensual').value = cuotaMensual.toFixed(2);
};

window.generarAmortizacion = function() {
  const tbody = document.getElementById('tablaAmortizacion').querySelector('tbody');
  tbody.innerHTML = '';

  let saldo = parseFloat(document.getElementById('saldo').value);
  const tasa = parseFloat(document.getElementById('tasa').value) / 100;
  const tasaMensual = tasa / 12;
  const meses = parseInt(document.getElementById('meses').value);
  const cuotaMensual = parseFloat(document.getElementById('cuotaMensual').value);

  for (let i = 1; i <= meses; i++) {
    const interes = saldo * tasaMensual;
    const abono = cuotaMensual - interes;
    saldo -= abono;

    const tr = document.createElement('tr');
    [i, cuotaMensual, interes, abono, saldo].forEach(v => {
      const td = document.createElement('td');
      td.textContent = v.toFixed(2);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  }
};
