/**
 * Class representing a ticket request in a support system
 */
export class TicketRequest {
    private static nextId: number = 1;
    
    readonly id: string;
    subject: string;
    description: string;
    orderNumber: string;
    createdAt: Date;
  
    /**
     * Create a new ticket request
     * @param subject - The subject of the ticket
     * @param description - Detailed description of the issue
     * @param orderNumber - Reference order number (if applicable)
     */
    constructor(subject: string, description: string, orderNumber: string = '') {
      this.id = `TICKET-${TicketRequest.nextId++}`;
      this.subject = subject;
      this.description = description;
      this.orderNumber = orderNumber;
      this.createdAt = new Date();
    }
  
    /**
     * Updates the ticket description
     * @param newDescription - Updated description text
     */
    updateDescription(newDescription: string): void {
      this.description = newDescription;
    }
  
    /**
     * Creates a summary of the ticket
     * @returns A string summary of the ticket
     */
    getSummary(): string {
      return `Ticket ${this.id}: "${this.subject}" ${this.orderNumber ? `(Order: ${this.orderNumber})` : ''}`;
    }
  
    /**
     * Get full ticket details
     * @returns An object with all ticket properties
     */
    getDetails(): object {
      return {
        id: this.id,
        subject: this.subject,
        description: this.description,
        orderNumber: this.orderNumber,
        createdAt: this.createdAt
      };
    }
  }
  
  /**
   * Singleton class for managing a collection of ticket requests
   */
  class TicketManager {
    private static instance: TicketManager | null = null;
    private tickets: Map<string, TicketRequest> = new Map();
    
    /**
     * Private constructor to prevent direct construction calls with the `new` operator
     */
    private constructor() {
      // Initialize the tickets map
    }
    
    /**
     * Get the singleton instance of TicketManager
     * @returns The singleton instance
     */
    public static getInstance(): TicketManager {
      if (!TicketManager.instance) {
        TicketManager.instance = new TicketManager();
      }
      
      return TicketManager.instance;
    }
  
    /**
     * Create a new ticket
     * @param subject - The subject of the ticket
     * @param description - Detailed description of the issue
     * @param orderNumber - Reference order number (if applicable)
     * @returns The created ticket
     */
    createTicket(subject: string, description: string, orderNumber: string = ''): TicketRequest {
      const ticket = new TicketRequest(subject, description, orderNumber);
      this.tickets.set(ticket.id, ticket);
      return ticket;
    }
  
    /**
     * Get a ticket by its ID
     * @param id - The ticket ID
     * @returns The ticket or undefined if not found
     */
    getTicket(id: string): TicketRequest | undefined {
      return this.tickets.get(id);
    }
  
    /**
     * Get all tickets
     * @returns Array of all tickets
     */
    getAllTickets(): TicketRequest[] {
      return Array.from(this.tickets.values());
    }
  
    /**
     * Search tickets by subject or description
     * @param query - Search term
     * @returns Array of matching tickets
     */
    searchTickets(query: string): TicketRequest[] {
      const lowerQuery = query.toLowerCase();
      
      return this.getAllTickets().filter(ticket => 
        ticket.subject.toLowerCase().includes(lowerQuery) || 
        ticket.description.toLowerCase().includes(lowerQuery)
      );
    }
  
    /**
     * Filter tickets by order number
     * @param orderNumber - Order number to filter by
     * @returns Array of tickets with matching order number
     */
    getTicketsByOrderNumber(orderNumber: string): TicketRequest[] {
      return this.getAllTickets().filter(ticket => 
        ticket.orderNumber === orderNumber
      );
    }
  }
  
 export  const ticketSystem = TicketManager.getInstance();
  
  