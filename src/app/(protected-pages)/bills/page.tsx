'use client';

import { useMemo } from 'react';
import Container from '@/components/shared/Container';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';

const { Tr, Td, TBody, THead, Th } = Table;

type Invoice = {
    id: number;
    invoiceNumber: string;
    date: string;
    lawyerName: string;
    consultationDateTime: string;
    duration: number;
    consultantFee: number;
    platformFee: number;
    vat: number;
    total: number;
    status: 'paid' | 'refunded';
};

const invoiceStatusColor: Record<
    Invoice['status'],
    {
        label: string;
        dotClass: string;
        textClass: string;
    }
> = {
    paid: {
        label: 'پرداخت شده',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    refunded: {
        label: 'عودت شده',
        dotClass: 'bg-orange-500',
        textClass: 'text-orange-500',
    },
};

// تابع فرمت کردن اعداد به تومان
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
};

// Mock Data
const mockInvoices: Invoice[] = [
    {
        id: 1,
        invoiceNumber: 'INV-1403-001',
        date: '1403/10/15',
        lawyerName: 'دکتر احمد محمدی',
        consultationDateTime: '1403/10/15 - 10:00',
        duration: 30,
        consultantFee: 500000,
        platformFee: 50000,
        vat: 49500,
        total: 599500,
        status: 'paid',
    },
    {
        id: 2,
        invoiceNumber: 'INV-1403-002',
        date: '1403/10/18',
        lawyerName: 'دکتر فاطمه رضایی',
        consultationDateTime: '1403/10/18 - 14:30',
        duration: 15,
        consultantFee: 300000,
        platformFee: 30000,
        vat: 29700,
        total: 359700,
        status: 'paid',
    },
    {
        id: 3,
        invoiceNumber: 'INV-1403-003',
        date: '1403/10/12',
        lawyerName: 'دکتر علی کریمی',
        consultationDateTime: '1403/10/12 - 16:00',
        duration: 30,
        consultantFee: 450000,
        platformFee: 45000,
        vat: 44550,
        total: 539550,
        status: 'refunded',
    },
    {
        id: 4,
        invoiceNumber: 'INV-1403-004',
        date: '1403/10/20',
        lawyerName: 'دکتر مریم احمدی',
        consultationDateTime: '1403/10/20 - 09:00',
        duration: 15,
        consultantFee: 350000,
        platformFee: 35000,
        vat: 34650,
        total: 419650,
        status: 'paid',
    },
    {
        id: 5,
        invoiceNumber: 'INV-1403-005',
        date: '1403/10/10',
        lawyerName: 'دکتر حسین موسوی',
        consultationDateTime: '1403/10/10 - 11:30',
        duration: 30,
        consultantFee: 600000,
        platformFee: 60000,
        vat: 59400,
        total: 719400,
        status: 'paid',
    },
    {
        id: 6,
        invoiceNumber: 'INV-1403-006',
        date: '1403/10/22',
        lawyerName: 'دکتر سارا نوری',
        consultationDateTime: '1403/10/22 - 15:00',
        duration: 45,
        consultantFee: 750000,
        platformFee: 75000,
        vat: 74250,
        total: 899250,
        status: 'refunded',
    },
];

const InvoicesPage = () => {
    const columns: ColumnDef<Invoice>[] = useMemo(
        () => [
            {
                accessorKey: 'invoiceNumber',
                header: 'شماره صورتحساب',
                cell: (props) => {
                    const { invoiceNumber } = props.row.original;
                    return (
                        <span className="font-mono font-semibold text-slate-700">
                            {invoiceNumber}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'date',
                header: 'تاریخ صدور',
                cell: (props) => {
                    const { date } = props.row.original;
                    return <span dir="ltr">{date}</span>;
                },
            },
            {
                accessorKey: 'lawyerName',
                header: 'مشاوره با',
                cell: (props) => {
                    const { lawyerName } = props.row.original;
                    return (
                        <span className="font-semibold text-slate-700">
                            {lawyerName}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'consultationDateTime',
                header: 'تاریخ و زمان مشاوره',
                cell: (props) => {
                    const { consultationDateTime } = props.row.original;
                    return (
                        <span dir="ltr" className="text-slate-600">
                            {consultationDateTime}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'duration',
                header: 'مدت مشاوره',
                cell: (props) => {
                    const { duration } = props.row.original;
                    return (
                        <span className="text-slate-600">
                            {duration} دقیقه
                        </span>
                    );
                },
            },
            {
                accessorKey: 'consultantFee',
                header: 'هزینه مشاور',
                cell: (props) => {
                    const { consultantFee } = props.row.original;
                    return (
                        <span className="text-slate-600">
                            {formatCurrency(consultantFee)}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'platformFee',
                header: 'کارمزد پلتفورم',
                cell: (props) => {
                    const { platformFee } = props.row.original;
                    return (
                        <span className="text-slate-500">
                            {formatCurrency(platformFee)}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'vat',
                header: 'ارزش افزوده',
                cell: (props) => {
                    const { vat } = props.row.original;
                    return (
                        <span className="text-slate-500">
                            {formatCurrency(vat)}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'total',
                header: 'جمع کل',
                cell: (props) => {
                    const { total } = props.row.original;
                    return (
                        <span className="font-bold text-primary-600">
                            {formatCurrency(total)}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'status',
                header: 'وضعیت',
                cell: (props) => {
                    const { status } = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={invoiceStatusColor[status].dotClass}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 font-semibold ${invoiceStatusColor[status].textClass}`}
                            >
                                {invoiceStatusColor[status].label}
                            </span>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const table = useReactTable({
        data: mockInvoices,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // محاسبه مجموع‌ها
    const totalPaid = mockInvoices
        .filter((inv) => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.total, 0);

    const totalRefunded = mockInvoices
        .filter((inv) => inv.status === 'refunded')
        .reduce((sum, inv) => sum + inv.total, 0);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8"
            dir="rtl"
        >
            <Container>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">
                            صورتحساب‌ها
                        </h1>
                        <p className="text-slate-600">
                            لیست تمام صورتحساب‌های مشاوره‌های شما
                        </p>
                    </div>

                    {/* کارت‌های خلاصه */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <Card className=" border-emerald-200">
                            <div className="text-center">
                                <p className="text-emerald-600 text-sm font-medium mb-1">
                                    مجموع پرداخت شده
                                </p>
                                <p className="text-2xl font-bold text-emerald-700">
                                    {formatCurrency(totalPaid)}
                                </p>
                                <p className="text-emerald-500 text-sm mt-1">
                                    {mockInvoices.filter((inv) => inv.status === 'paid').length} فاکتور
                                </p>
                            </div>
                        </Card>
                        <Card className="border-orange-200">
                            <div className="text-center">
                                <p className="text-orange-600 text-sm font-medium mb-1">
                                    مجموع عودت شده
                                </p>
                                <p className="text-2xl font-bold text-orange-700">
                                    {formatCurrency(totalRefunded)}
                                </p>
                                <p className="text-orange-500 text-sm mt-1">
                                    {mockInvoices.filter((inv) => inv.status === 'refunded').length} فاکتور
                                </p>
                            </div>
                        </Card>
                        <Card className="border-blue-200">
                            <div className="text-center">
                                <p className="text-blue-600 text-sm font-medium mb-1">
                                    کل صورتحساب‌ها
                                </p>
                                <p className="text-2xl font-bold text-blue-700">
                                    {mockInvoices.length}
                                </p>
                                <p className="text-blue-500 text-sm mt-1">
                                    صورتحساب
                                </p>
                            </div>
                        </Card>
                    </div>

                    <Card>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                            <h4 className="text-xl font-semibold">
                                لیست صورتحساب‌ها
                            </h4>
                            <div className="flex items-center gap-4">
                                <Badge
                                    className="bg-emerald-500"
                                    content={`${mockInvoices.filter((c) => c.status === 'paid').length} پرداخت شده`}
                                />
                                <Badge
                                    className="bg-orange-500"
                                    content={`${mockInvoices.filter((c) => c.status === 'refunded').length} عودت شده`}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <Table hoverable>
                                <THead>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <Tr key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <Th
                                                        key={header.id}
                                                        colSpan={header.colSpan}
                                                        className="whitespace-nowrap"
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                    </Th>
                                                );
                                            })}
                                        </Tr>
                                    ))}
                                </THead>
                                <TBody>
                                    {table.getRowModel().rows.map((row) => {
                                        return (
                                            <Tr key={row.id}>
                                                {row.getVisibleCells().map((cell) => {
                                                    return (
                                                        <Td
                                                            key={cell.id}
                                                            className="whitespace-nowrap"
                                                        >
                                                            {flexRender(
                                                                cell.column.columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </Td>
                                                    );
                                                })}
                                            </Tr>
                                        );
                                    })}
                                </TBody>
                            </Table>
                        </div>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default InvoicesPage;