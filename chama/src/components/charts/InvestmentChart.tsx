'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        fill: boolean;
        tension: number;
        borderWidth?: number;
        pointRadius?: number;
        pointHoverRadius?: number;
    }[];
}

interface InvestmentChartProps {
    data: ChartData;
    title?: string;
}

export default function InvestmentChart({ data, title = "Evolução do Investimento" }: InvestmentChartProps) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12,
                        weight: 'bold' as const,
                    }
                }
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 16,
                    weight: 'bold' as const,
                },
                color: '#374151',
                padding: {
                    top: 10,
                    bottom: 20
                }
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#10b981',
                borderWidth: 1,
                callbacks: {
                    label: function(context: any) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y;
                        return `${label}: R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                    }
                }
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Período (anos)',
                    font: {
                        size: 12,
                        weight: 'bold' as const,
                    },
                    color: '#6b7280'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Valor (R$)',
                    font: {
                        size: 12,
                        weight: 'bold' as const,
                    },
                    color: '#6b7280'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 11
                    },
                    callback: function(value: any) {
                        return 'R$ ' + value.toLocaleString('pt-BR');
                    }
                }
            }
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white rounded-xl p-6 shadow-lg"
        >
            <div className="h-96 sm:h-[500px] w-full">
                <Line data={data} options={options} />
            </div>
        </motion.div>
    );
}
