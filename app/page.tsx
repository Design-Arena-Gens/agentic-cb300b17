"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Clock,
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  User,
  Calendar,
  Tag
} from "lucide-react";

type Priority = "low" | "medium" | "high" | "urgent";
type Status = "open" | "in-progress" | "pending" | "resolved" | "closed";

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string;
  requester: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  comments: number;
}

const initialTickets: Ticket[] = [
  {
    id: 1001,
    title: "Sistema de login não está funcionando",
    description: "Usuários não conseguem fazer login no sistema",
    status: "open",
    priority: "urgent",
    assignee: "João Silva",
    requester: "Maria Santos",
    category: "Técnico",
    createdAt: "2024-03-15T10:30:00",
    updatedAt: "2024-03-15T10:30:00",
    comments: 3
  },
  {
    id: 1002,
    title: "Solicitação de novo software",
    description: "Necessário instalar Adobe Creative Suite",
    status: "in-progress",
    priority: "medium",
    assignee: "Pedro Costa",
    requester: "Ana Oliveira",
    category: "Software",
    createdAt: "2024-03-14T14:20:00",
    updatedAt: "2024-03-15T09:15:00",
    comments: 5
  },
  {
    id: 1003,
    title: "Impressora não imprime",
    description: "Impressora do 3º andar não está respondendo",
    status: "pending",
    priority: "high",
    assignee: "Carlos Mendes",
    requester: "Roberto Lima",
    category: "Hardware",
    createdAt: "2024-03-13T11:45:00",
    updatedAt: "2024-03-14T16:30:00",
    comments: 2
  },
  {
    id: 1004,
    title: "Solicitação de acesso ao servidor",
    description: "Novo funcionário precisa de acesso",
    status: "resolved",
    priority: "low",
    assignee: "João Silva",
    requester: "Departamento RH",
    category: "Acesso",
    createdAt: "2024-03-12T09:00:00",
    updatedAt: "2024-03-13T10:20:00",
    comments: 1
  },
  {
    id: 1005,
    title: "Email não sincroniza no celular",
    description: "Cliente de email não está sincronizando",
    status: "open",
    priority: "medium",
    assignee: "Pedro Costa",
    requester: "Lucas Ferreira",
    category: "Email",
    createdAt: "2024-03-15T08:15:00",
    updatedAt: "2024-03-15T08:15:00",
    comments: 0
  }
];

export default function HelpDesk() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      medium: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    };
    return colors[priority];
  };

  const getStatusColor = (status: Status) => {
    const colors = {
      open: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      pending: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      closed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    };
    return colors[status];
  };

  const getStatusIcon = (status: Status) => {
    const icons = {
      open: <AlertCircle className="w-4 h-4" />,
      "in-progress": <Clock className="w-4 h-4" />,
      pending: <Clock className="w-4 h-4" />,
      resolved: <CheckCircle2 className="w-4 h-4" />,
      closed: <CheckCircle2 className="w-4 h-4" />
    };
    return icons[status];
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toString().includes(searchTerm);

    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
    const matchesPriority = filterPriority === "all" || ticket.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === "open").length,
    inProgress: tickets.filter(t => t.status === "in-progress").length,
    resolved: tickets.filter(t => t.status === "resolved").length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HelpDesk Professional</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sistema de gerenciamento de tickets</p>
            </div>
            <button
              onClick={() => setShowNewTicketModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Novo Ticket
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Abertos</p>
                <p className="text-3xl font-bold text-blue-600">{stats.open}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Em Progresso</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Resolvidos</p>
                <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as Status | "all")}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                <option value="all">Todos os Status</option>
                <option value="open">Aberto</option>
                <option value="in-progress">Em Progresso</option>
                <option value="pending">Pendente</option>
                <option value="resolved">Resolvido</option>
                <option value="closed">Fechado</option>
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as Priority | "all")}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                <option value="all">Todas as Prioridades</option>
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-gray-500 dark:text-gray-400">#{ticket.id}</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{ticket.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{ticket.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  {getStatusIcon(ticket.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status === "open" && "Aberto"}
                    {ticket.status === "in-progress" && "Em Progresso"}
                    {ticket.status === "pending" && "Pendente"}
                    {ticket.status === "resolved" && "Resolvido"}
                    {ticket.status === "closed" && "Fechado"}
                  </span>
                </div>

                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority === "low" && "Baixa"}
                  {ticket.priority === "medium" && "Média"}
                  {ticket.priority === "high" && "Alta"}
                  {ticket.priority === "urgent" && "Urgente"}
                </span>

                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Tag className="w-4 h-4" />
                  <span>{ticket.category}</span>
                </div>

                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <User className="w-4 h-4" />
                  <span>{ticket.assignee}</span>
                </div>

                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(ticket.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>

                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <MessageSquare className="w-4 h-4" />
                  <span>{ticket.comments} comentários</span>
                </div>
              </div>
            </div>
          ))}

          {filteredTickets.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Nenhum ticket encontrado</p>
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Novo Ticket</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Título</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Descreva o problema brevemente"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descrição</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Forneça mais detalhes sobre o problema"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prioridade</label>
                  <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Baixa</option>
                    <option>Média</option>
                    <option>Alta</option>
                    <option>Urgente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categoria</label>
                  <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Técnico</option>
                    <option>Software</option>
                    <option>Hardware</option>
                    <option>Acesso</option>
                    <option>Email</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setShowNewTicketModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowNewTicketModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Criar Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-gray-500 dark:text-gray-400">#{selectedTicket.id}</span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedTicket.title}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                      {selectedTicket.status === "open" && "Aberto"}
                      {selectedTicket.status === "in-progress" && "Em Progresso"}
                      {selectedTicket.status === "pending" && "Pendente"}
                      {selectedTicket.status === "resolved" && "Resolvido"}
                      {selectedTicket.status === "closed" && "Fechado"}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority === "low" && "Baixa"}
                      {selectedTicket.priority === "medium" && "Média"}
                      {selectedTicket.priority === "high" && "Alta"}
                      {selectedTicket.priority === "urgent" && "Urgente"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Descrição</h3>
                <p className="text-gray-900 dark:text-white">{selectedTicket.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Categoria</h3>
                  <p className="text-gray-900 dark:text-white">{selectedTicket.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Atribuído a</h3>
                  <p className="text-gray-900 dark:text-white">{selectedTicket.assignee}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Solicitante</h3>
                  <p className="text-gray-900 dark:text-white">{selectedTicket.requester}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Criado em</h3>
                  <p className="text-gray-900 dark:text-white">{new Date(selectedTicket.createdAt).toLocaleString('pt-BR')}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Comentários</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        MS
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Maria Santos</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Há 2 horas</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">Este problema está afetando toda a equipe de vendas. É urgente!</p>
                  </div>
                </div>
                <div className="mt-4">
                  <textarea
                    rows={3}
                    placeholder="Adicionar comentário..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Adicionar Comentário
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between">
                <button className="px-4 py-2 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 text-red-700 dark:text-red-300 transition-colors">
                  Fechar Ticket
                </button>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
                    Editar
                  </button>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    Marcar como Resolvido
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
