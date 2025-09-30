"use client";

import { useState, useMemo, useEffect, useRef } from "react";

function daysBetween(a: Date, b: Date): number {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function monthsBetween(a: Date, b: Date): number {
  const months =
    (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  return months + (b.getDate() >= a.getDate() ? 0 : -1);
}

export function useRescisao() {
  const [salary, setSalary] = useState(2500);
  const [hireDate, setHireDate] = useState(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    return d.toISOString().slice(0, 10);
  });
  const [termDate, setTermDate] = useState(
    () => new Date().toISOString().slice(0, 10)
  );
  const [motive, setMotive] = useState("sem_justa_causa");
  const [aviso, setAviso] = useState("trabalhado");
  const [dependents, setDependents] = useState(0);
  const [fgtsBefore, setFgtsBefore] = useState(0);
  const [vacationDays, setVacationDays] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [explode, setExplode] = useState(false);

  const confettiRef = useRef<HTMLCanvasElement | null>(null);

  const result = useMemo(() => {
    const s = Number(salary) || 0;
    const hire = new Date(hireDate);
    const term = new Date(termDate);
    if (isNaN(hire.getTime()) || isNaN(term.getTime()) || term < hire)
      return null;

    const totalDays = daysBetween(hire, term);
    const totalMonths = monthsBetween(hire, term);
    const yearsComplete = Math.floor(totalMonths / 12);

    const daysWorkedThisMonth = term.getDate();
    const salaryPerDay = s / 30;
    const saldoSalario = salaryPerDay * daysWorkedThisMonth;

    const startOfYear = new Date(term.getFullYear(), 0, 1);
    const monthsThisYear = Math.max(
      0,
      monthsBetween(new Date(Math.max(hire.getTime(), startOfYear.getTime())), term)
    );
    const decimoTerceiro = s * (monthsThisYear / 12);

    const mesesParaFerias = monthsThisYear;
    const feriasProporcionaisBruto = s * (mesesParaFerias / 12);
    const adicionalUmTercoFerias = feriasProporcionaisBruto / 3;
    const feriasVencidasValor =
      ((Number(vacationDays) || 0) / 30) * s +
      (((Number(vacationDays) || 0) / 30) * s) / 3;

    const fgtsAcumulado = s * 0.08 * Math.max(0, totalMonths);
    const multaFgts =
      motive === "sem_justa_causa"
        ? (fgtsAcumulado + Number(fgtsBefore || 0)) * 0.4
        : 0;

    let avisoDias = 0;
    if (aviso === "indenizado") {
      avisoDias = Math.min(90, 30 + yearsComplete * 3);
    }
    const avisoValor = aviso === "trabalhado" ? 0 : salaryPerDay * avisoDias;

    const total =
      saldoSalario +
      decimoTerceiro +
      feriasProporcionaisBruto +
      adicionalUmTercoFerias +
      feriasVencidasValor +
      multaFgts +
      avisoValor;

    return {
      saldoSalario: +saldoSalario.toFixed(2),
      decimoTerceiro: +decimoTerceiro.toFixed(2),
      feriasProporcionais: +(feriasProporcionaisBruto + adicionalUmTercoFerias).toFixed(2),
      feriasVencidasValor: +feriasVencidasValor.toFixed(2),
      fgtsAcumulado: +fgtsAcumulado.toFixed(2),
      multaFgts: +multaFgts.toFixed(2),
      avisoValor: +avisoValor.toFixed(2),
      total: +total.toFixed(2),
      totalMonths,
      totalDays,
      avisoDias,
      yearsComplete,
      monthsThisYear,
    };
  }, [salary, hireDate, termDate, motive, aviso, dependents, fgtsBefore, vacationDays]);

  return {
    salary, setSalary,
    hireDate, setHireDate,
    termDate, setTermDate,
    motive, setMotive,
    aviso, setAviso,
    dependents, setDependents,
    fgtsBefore, setFgtsBefore,
    vacationDays, setVacationDays,
    showResult, setShowResult,
    explode, setExplode,
    confettiRef,
    result
  };
}
