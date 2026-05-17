import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Hotel } from '../models/hotel.model';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-hotel-details',
  template: `
    <div class="hotel-details-page p-6 max-w-7xl mx-auto" *ngIf="hotel">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left Panel -->
        <div class="lg:col-span-1 space-y-6">
          
          <!-- Image Section -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <img [src]="hotel.imageUrl" [alt]="hotel.name" class="w-full h-64 object-cover">
            <div class="p-4 border-t border-slate-100">
              <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Provider</p>
              <h2 class="text-xl font-bold text-slate-900">{{ hotel.provider }}</h2>
            </div>
          </div>

          <!-- Address Section -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-bold">Address</h3>
              <button *ngIf="!isEditing" (click)="startEdit()" class="text-blue-600 font-medium text-sm hover:underline">Edit</button>
            </div>
            
            <div class="space-y-3 text-slate-600" *ngIf="!isEditing; else addressForm">
              <p><strong>Street:</strong> {{ hotel.street || 'N/A' }}</p>
              <p><strong>State:</strong> {{ hotel.state || 'N/A' }}</p>
              <p><strong>Country:</strong> {{ hotel.country || 'N/A' }}</p>
              <p><strong>Pincode:</strong> {{ hotel.pincode || 'N/A' }}</p>
              <p><strong>Email:</strong> {{ hotel.email || 'N/A' }}</p>
              <p><strong>Phone:</strong> {{ hotel.phone || 'N/A' }}</p>
            </div>
            
            <ng-template #addressForm>
               <div class="space-y-3">
                 <input [(ngModel)]="editForm.street" placeholder="Street" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                 <input [(ngModel)]="editForm.state" placeholder="State" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                 <input [(ngModel)]="editForm.country" placeholder="Country" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                 <input [(ngModel)]="editForm.pincode" placeholder="Pincode" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                 <input [(ngModel)]="editForm.email" placeholder="Email" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                 <input [(ngModel)]="editForm.phone" placeholder="Phone" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
               </div>
            </ng-template>
          </div>

          <!-- Basic Info Section -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 class="text-lg font-bold mb-4">Basic Info</h3>
            <div class="space-y-3 text-slate-600" *ngIf="!isEditing; else basicInfoForm">
              <p><strong>Short Name:</strong> {{ hotel.shortName || 'N/A' }}</p>
              <p><strong>Hotel ID:</strong> {{ hotel.id }}</p>
              <p><strong>Hotel Type:</strong> {{ hotel.hotelType || 'N/A' }}</p>
              <p><strong>Currency:</strong> {{ hotel.currency || 'INR' }}</p>
              <p><strong>Location:</strong> {{ hotel.location }}</p>
            </div>
            
            <ng-template #basicInfoForm>
               <div class="space-y-3">
                 <input [(ngModel)]="editForm.shortName" placeholder="Short Name" class="w-full p-2 border rounded-lg">
                 <input [(ngModel)]="editForm.hotelType" placeholder="Hotel Type" class="w-full p-2 border rounded-lg">
                 <input [(ngModel)]="editForm.currency" placeholder="Currency" class="w-full p-2 border rounded-lg">
                 <input [(ngModel)]="editForm.location" placeholder="Location" class="w-full p-2 border rounded-lg">
                 
                 <div class="flex gap-2 pt-4">
                   <button (click)="save()" class="flex-1 bg-slate-900 text-white py-2 rounded-xl font-semibold hover:bg-slate-800">Save</button>
                   <button (click)="cancel()" class="flex-1 bg-slate-100 text-slate-700 py-2 rounded-xl font-semibold hover:bg-slate-200">Cancel</button>
                 </div>
               </div>
            </ng-template>
          </div>

          <button routerLink="/search" class="w-full py-3 text-slate-500 font-medium hover:bg-slate-50 rounded-xl transition-colors">
             ← Back to Search
          </button>
        </div>

        <!-- Right Panel -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px]">
            <!-- Tab Navigation -->
            <div class="flex border-b border-slate-100 bg-slate-50/50 overflow-x-auto">
              <button *ngFor="let tab of tabs" 
                (click)="activeTab = tab"
                [class.text-blue-600]="activeTab === tab"
                [class.border-blue-600]="activeTab === tab"
                [class.bg-white]="activeTab === tab"
                class="px-6 py-4 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-all border-b-2 border-transparent whitespace-nowrap">
                {{ tab }}
              </button>
            </div>

            <!-- Tab Content -->
            <div class="p-8">
              <!-- Home Tab -->
              <div *ngIf="activeTab === 'Home'" class="space-y-8">
                <h1 class="text-4xl font-bold text-slate-900 mb-2">{{ hotel.name }}</h1>
                <p class="text-xl text-slate-500 mb-6">{{ hotel.location }}, {{ hotel.country }}</p>
                
                <!-- Dashboard Widgets -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Last Service Used</p>
                    <p class="text-lg font-bold text-slate-900 mt-1">{{ hotel.lastUsed || 'N/A' }}</p>
                  </div>
                  <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Confirmed Bookings</p>
                    <p class="text-lg font-bold text-slate-900 mt-1">{{ hotel.confirmedBookings || 0 }}</p>
                  </div>
                  <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">On Request Bookings</p>
                    <p class="text-lg font-bold text-slate-900 mt-1">{{ hotel.onRequestBookings || 0 }}</p>
                  </div>
                  <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Booking Date</p>
                    <p class="text-lg font-bold text-slate-900 mt-1">{{ hotel.nextBookingDate || 'N/A' }}</p>
                  </div>
                  <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Open Complaints</p>
                    <p class="text-lg font-bold text-red-600 mt-1">{{ hotel.openComplaints || 0 }}</p>
                  </div>
                  <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Complaints</p>
                    <p class="text-lg font-bold text-slate-900 mt-1">{{ hotel.totalComplaints || 0 }}</p>
                  </div>
                  <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 sm:col-span-2">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Amount To Be Paid</p>
                    <p class="text-lg font-bold text-blue-600 mt-1">{{ hotel.totalAmount | currency:(hotel.currency || 'INR') }}</p>
                  </div>
                </div>

                <!-- Interactive Map Section -->
                <app-hotel-map [hotel]="hotel"></app-hotel-map>

                <!-- Booking Overview Graph -->
                <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Booking Trends (Current Year)</p>
                  <div class="relative h-64">
                    <canvas baseChart
                      [data]="barChartData"
                      [options]="barChartOptions"
                      [type]="barChartType">
                    </canvas>
                  </div>
                </div>

                <hr class="mb-8 border-slate-100">
                <div class="description-section">
                  <h2 class="text-xl font-bold mb-4 text-slate-800">Description</h2>
                  <p class="text-slate-600 leading-relaxed text-lg">{{ hotel.description }}</p>
                </div>
              </div>

              <!-- About Tab -->
              <div *ngIf="activeTab === 'About'">
                <h2 class="text-2xl font-bold text-slate-900 mb-4">About {{ hotel.name }}</h2>
                <p class="text-slate-600 leading-relaxed">Experience world-class service at {{ hotel.name }} managed by {{ hotel.provider }}. This property is strategically located in {{ hotel.location }} to provide the best access to local attractions.</p>
              </div>

              <!-- Classification Tab -->
              <div *ngIf="activeTab === 'Classification'">
                <h2 class="text-2xl font-bold text-slate-900 mb-4">Property Classification</h2>
                <div class="space-y-2 text-slate-600">
                  <p><strong>Hotel Type:</strong> {{ hotel.hotelType || 'N/A' }}</p>
                  <p><strong>Star Rating:</strong> ★ {{ hotel.rating }}</p>
                  <p><strong>Official Provider:</strong> {{ hotel.provider }}</p>
                </div>
              </div>

              <!-- Products Tab -->
              <div *ngIf="activeTab === 'Products'">
                <h2 class="text-2xl font-bold text-slate-900 mb-4">Products & Inventory</h2>
                <p class="text-slate-500 italic">Inventory management and room product listings are currently under maintenance.</p>
              </div>

              <!-- Terms Tab -->
              <div *ngIf="activeTab === 'Terms'">
                <h2 class="text-2xl font-bold text-slate-900 mb-4">Terms & Conditions</h2>
                <p class="text-slate-600">Standard cancellation policies apply. Please consult the contract details for {{ hotel.provider }} for specific seasonal variations.</p>
              </div>

              <!-- Finance Tab -->
              <div *ngIf="activeTab === 'Finance'">
                <h2 class="text-2xl font-bold text-slate-900 mb-4">Financial Configuration</h2>
                <div class="space-y-2 text-slate-600">
                  <p><strong>Default Currency:</strong> {{ hotel.currency || 'INR' }}</p>
                  <p><strong>Base Rate per Night:</strong> {{ hotel.pricePerNight | currency:(hotel.currency || 'INR') }}</p>
                </div>
              </div>

              <!-- Notes Tab -->
              <div *ngIf="activeTab === 'Notes'">
                <h2 class="text-2xl font-bold text-slate-900 mb-4">Internal Notes</h2>
                <textarea placeholder="Add internal management notes for this property..." class="w-full p-4 border border-slate-200 rounded-xl h-48 outline-none focus:ring-2 focus:ring-blue-500 transition-all"></textarea>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class HotelDetailsComponent implements OnInit {
  hotel: Hotel | undefined;
  isEditing = false;
  editForm: Partial<Hotel> = {};

  // Chart configuration
  barChartOptions: ChartConfiguration['options'] = { responsive: true };
  barChartType: ChartType = 'bar';
  barChartData: ChartData<'bar'> = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [ { data: [], label: 'Bookings' } ]
  };

  // Tab Navigation State
  tabs = ['Home', 'About', 'Classification', 'Products', 'Terms', 'Finance', 'Notes'];
  activeTab = 'Home';

  constructor(private route: ActivatedRoute, private hotelService: HotelService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hotel = this.hotelService.getHotelById(id);
    if (this.hotel) {
      this.barChartData.datasets[0].data = this.hotel.monthlyBookings || [];
    }
  }

  startEdit() {
    this.isEditing = true;
    this.editForm = { ...this.hotel };
  }

  save() {
    if (this.hotel && this.editForm) {
      const updated = { ...this.hotel, ...this.editForm } as Hotel;
      this.hotelService.updateHotel(updated);
      this.hotel = updated;
      this.barChartData.datasets[0].data = updated.monthlyBookings;
      this.isEditing = false;
    }
  }

  cancel() {
    this.isEditing = false;
  }
}
