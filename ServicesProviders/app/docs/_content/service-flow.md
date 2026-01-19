# تدفق الخدمة الشامل: من الحجز إلى الإكمال

## جدول المحتويات

1. [نظرة عامة](#1-نظرة-عامة)
2. [الأطراف والمكونات](#2-الأطراف-والمكونات)
3. [الهندسة المعمارية](#3-الهندسة-المعمارية)
4. [نموذج البيانات](#4-نموذج-البيانات)
5. [واجهات برمجة التطبيقات (API)](#5-واجهات-برمجة-التطبيقات-api)
6. [تدفق العملية الكامل](#6-تدفق-العملية-الكامل)
7. [معالجة الأخطاء والاستثناءات](#7-معالجة-الأخطاء-والاستثناءات)
8. [أمثلة التنفيذ](#8-أمثلة-التنفيذ)
9. [التوافق والإصدارات](#9-التوافق-والإصدارات)
10. [دليل البدء السريع](#10-دليل-البدء-السريع)

---

## 1. نظرة عامة

يُعد تدفق الخدمة النواة المركزية لنظام إدارة الخدمات، حيث يوفر إطاراً شاملاً لإدارة دورة حياة الخدمة من لحظة الحجز حتى الإكمال النهائي. يُمكّن هذا التدفق مقدمي الخدمات من إدارة طلباتهم بكفاءة بينما يضمن للعملاء تجربة سلسة وموثوقة.

### 1.1 الأهداف الرئيسية

- **الكفاءة التشغيلية**: تقليل الوقت والجهد المطلوب لإدارة الخدمات
- **الشفافية**: تزويد جميع الأطراف بالمعلومات اللازمة في الوقت المناسب
- **الموثوقية**: ضمان دقة المعاملات وسلامة البيانات
- **القابلية للتوسع**: دعم النمو المستقبلي للمنصة

### 1.2 نطاق التغطية

يغطي هذا التوثيق جميع جوانب تدفق الخدمة بما في ذلك:
- المعمارية التقنية والتصميم
- واجهات برمجة التطبيقات الكاملة
- معالجة الأخطاء والاستثناءات
- أمثلة التنفيذ العملية
- متطلبات التوافق والإصدارات

---

## 2. الأطراف والمكونات

### 2.1 الأطراف المشاركة

| الطرف | الدور | المسؤوليات |
|-------|--------|------------|
| **العميل** | مستهلك الخدمة | - اختيار الخدمة والخيارات<br>- إتمام الدفع<br>- تأكيد الإكمال |
| **مقدم الخدمة** | مزود الخدمة | - قبول/رفض الطلبات<br>- تنفيذ الخدمة<br>- طلب تأكيد الإكمال |
| **نظام الدفع** | معالجة المدفوعات | - معالجة المعاملات<br>- إرسال تأكيدات الويب هوك<br>- إدارة الاستردادات |
| **نظام الإشعارات** | التواصل | - إرسال التحديثات<br>- إدارة التفضيلات<br>- تتبع الحالة |
| **الإدارة/الدعم** | الإشراف | - حل النزاعات<br>- إدارة السياسات<br>- مراقبة الجودة |

### 2.2 المكونات التقنية

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Client App] --> B[Provider Dashboard]
        C[Admin Panel]
    end
    
    subgraph "API Gateway"
        D[REST API]
        E[WebSocket]
        F[Webhook Handler]
    end
    
    subgraph "Service Layer"
        G[Booking Service]
        H[Payment Service]
        I[Notification Service]
        J[Chat Service]
    end
    
    subgraph "Data Layer"
        K[(PostgreSQL)]
        L[(Redis Cache)]
        M[(File Storage)]
    end
    
    A --> D
    B --> D
    C --> D
    D --> G
    D --> H
    D --> I
    D --> J
    G --> K
    H --> K
    I --> L
    J --> M
```

---

## 3. الهندسة المعمارية

### 3.1 البنية التقنية

#### 3.1.1 Stack التكنولوجيا

| المكون | التكنولوجيا | الإصدار |
|--------|-------------|---------|
| Frontend | Next.js | 16.1.1 |
| Backend Runtime | Node.js | 20.x LTS |
| Database | PostgreSQL | 15.x |
| Cache | Redis | 7.x |
| State Management | Zustand | 4.x |
| Validation | Zod | 3.x |
| Styling | Tailwind CSS | 3.x |
| Payment Processing | Stripe API | 2023-10-16 |

#### 3.1.2 البنية الميكروخدمية

```typescript
// Service Interface Definition
interface IBookingService {
  createBooking(data: CreateBookingDto): Promise<Booking>;
  updateBookingStatus(id: string, status: BookingStatus): Promise<Booking>;
  getBookingById(id: string): Promise<Booking>;
  getBookingsByProvider(providerId: string): Promise<Booking[]>;
}

interface IPaymentService {
  processPayment(bookingId: string, amount: number): Promise<PaymentResult>;
  refundPayment(paymentId: string, reason: string): Promise<RefundResult>;
  validateWebhook(signature: string, payload: any): boolean;
}
```

### 3.2 مخطط قاعدة البيانات

```mermaid
erDiagram
    User ||--o{ Booking : places
    User ||--o{ Service : provides
    Booking ||--o{ BookingOption : contains
    Booking ||--o{ Payment : has
    Booking ||--o{ Message : generates
    Service ||--o{ ServiceOption : offers
    User ||--o{ Review : writes
    
    User {
        string id PK
        string email UK
        string name
        string role
        datetime created_at
        datetime updated_at
    }
    
    Service {
        string id PK
        string provider_id FK
        string title
        text description
        decimal base_price
        string status
        datetime created_at
    }
    
    Booking {
        string id PK
        string customer_id FK
        string service_id FK
        string status
        datetime scheduled_at
        decimal total_amount
        json selected_options
        datetime created_at
    }
    
    Payment {
        string id PK
        string booking_id FK
        decimal amount
        string status
        string payment_intent_id
        json metadata
        datetime created_at
    }
```

---

## 4. نموذج البيانات

### 4.1 أنواع البيانات الأساسية

```typescript
// Core Enums
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PAYMENT_PENDING = 'payment_pending',
  CUSTOMER_PAID = 'customer_paid',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  COMPLETED = 'completed',
  DISPUTE = 'dispute',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum NotificationType {
  BOOKING_CREATED = 'booking_created',
  BOOKING_CONFIRMED = 'booking_confirmed',
  PAYMENT_CONFIRMED = 'payment_confirmed',
  SERVICE_STARTED = 'service_started',
  COMPLETION_REQUESTED = 'completion_requested',
  COMPLETION_CONFIRMED = 'completion_confirmed',
  DISPUTE_RAISED = 'dispute_raised'
}
```

### 4.2 واجهات TypeScript

```typescript
// Core Interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'provider' | 'admin';
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  providerId: string;
  title: string;
  description: string;
  basePrice: number;
  currency: string;
  duration: number; // in minutes
  status: 'active' | 'inactive' | 'suspended';
  options: ServiceOption[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  isRequired: boolean;
  minQuantity?: number;
  maxQuantity?: number;
}

export interface Booking {
  id: string;
  customerId: string;
  serviceId: string;
  providerId: string;
  status: BookingStatus;
  scheduledAt: Date;
  totalAmount: number;
  selectedOptions: SelectedOption[];
  paymentStatus: PaymentStatus;
  customerNotes?: string;
  providerNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SelectedOption {
  optionId: string;
  quantity: number;
  price: number;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentIntentId: string;
  clientSecret?: string;
  metadata: Record<string, any>;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 5. واجهات برمجة التطبيقات (API)

### 5.1 نقاط النهاية الأساسية

#### 5.1.1 إدارة الحجوزات

```http
POST /api/v1/bookings
```
**الوصف:** إنشاء حجز جديد
**التوثيق:** Bearer Token (Customer)
**جسم الطلب:**
```json
{
  "serviceId": "string",
  "scheduledAt": "2024-01-20T10:00:00Z",
  "selectedOptions": [
    {
      "optionId": "string",
      "quantity": 1
    }
  ],
  "customerNotes": "string"
}
```
**الاستجابة الناجحة (201):**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "bkg_1234567890",
      "status": "pending",
      "totalAmount": 150.00,
      "scheduledAt": "2024-01-20T10:00:00Z",
      "paymentIntent": {
        "clientSecret": "pi_1234567890_secret_abc123"
      }
    }
  }
}
```

```http
GET /api/v1/bookings/{id}
```
**الوصف:** الحصول على تفاصيل الحجز
**المعاملات:**
- `id` (path): معرف الحجز
**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "string",
      "status": "string",
      "service": {
        "id": "string",
        "title": "string",
        "provider": {
          "id": "string",
          "name": "string"
        }
      },
      "totalAmount": 150.00,
      "scheduledAt": "2024-01-20T10:00:00Z",
      "paymentStatus": "pending"
    }
  }
}
```

```http
PUT /api/v1/bookings/{id}/status
```
**الوصف:** تحديث حالة الحجز
**المعاملات:**
- `id` (path): معرف الحجز
**جسم الطلب:**
```json
{
  "status": "confirmed",
  "notes": "Optional notes"
}
```

#### 5.1.2 معالجة المدفوعات

```http
POST /api/v1/payments/confirm
```
**الوصف:** تأكيد الدفع
**جسم الطلب:**
```json
{
  "paymentIntentId": "pi_1234567890",
  "bookingId": "bkg_1234567890"
}
```

```http
POST /api/v1/payments/webhook
```
**الوصف:** معالجة webhooks من مزود الدفع
**التوثيق:** Webhook Signature Verification
**جسم الطلب:** (من Stripe)
```json
{
  "id": "evt_1234567890",
  "object": "event",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_1234567890",
      "amount": 15000,
      "status": "succeeded"
    }
  }
}
```

### 5.2 معالجة الأخطاء

#### 5.2.1 تنسيق الاستجابة القياسي

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}
```

#### 5.2.2 رموز الأخطاء الشائعة

| الكود | الوصف | الحالة HTTP |
|--------|--------|-------------|
| `BOOKING_NOT_FOUND` | الحجز غير موجود | 404 |
| `INVALID_BOOKING_STATUS` | حالة الحجز غير صالحة | 400 |
| `PAYMENT_FAILED` | فشلت عملية الدفع | 402 |
| `SERVICE_UNAVAILABLE` | الخدمة غير متاحة | 503 |
| `UNAUTHORIZED` | غير مصرح | 401 |
| `FORBIDDEN` | ممنوع | 403 |
| `VALIDATION_ERROR` | خطأ في التحقق | 422 |
| `RATE_LIMIT_EXCEEDED` | تم تجاوز حد الطلبات | 429 |

---

## 6. تدفق العملية الكامل

### 6.1 مخطط حالة النظام

```mermaid
stateDiagram-v2
    [*] --> PENDING : إنشاء الحجز
    PENDING --> CONFIRMED : قبول مقدم الخدمة
    PENDING --> CANCELLED : إلغاء العميل
    
    CONFIRMED --> PAYMENT_PENDING : بانتظار الدفع
    PAYMENT_PENDING --> CUSTOMER_PAID : تأكيد الدفع
    CUSTOMER_PAID --> IN_PROGRESS : بدء التنفيذ
    
    IN_PROGRESS --> REVIEW : طلب تأكيد الإكمال
    REVIEW --> IN_PROGRESS : طلب تعديل
    REVIEW --> COMPLETED : تأكيد الإكمال
    REVIEW --> DISPUTE : فتح نزاع
    
    COMPLETED --> PAID_OUT : صرف الأرباح
    DISPUTE --> REFUNDED : استرداد
    DISPUTE --> PAID_OUT : قرار بالصرف
    
    CANCELLED --> [*]
    REFUNDED --> [*]
    PAID_OUT --> [*]
```

### 6.2 تسلسل التفاعل الكامل

```mermaid
sequenceDiagram
    autonumber
    actor Customer as العميل
    participant Frontend as واجهة المستخدم
    participant API as API Gateway
    participant Booking as Booking Service
    participant Payment as Payment Service
    participant Notification as Notification Service
    participant Provider as Provider Dashboard
    
    Customer->>Frontend: اختيار الخدمة والخيارات
    Customer->>Frontend: تحديد الموعد
    Frontend->>API: POST /api/v1/bookings
    API->>Booking: إنشاء حجز جديد
    Booking-->>API: حجز مُنشأ (pending)
    API-->>Frontend: تأكيد الإنشاء
    
    Booking->>Notification: إشعار مقدم الخدمة
    Notification-->>Provider: حجز جديد
    
    Provider->>Frontend: قبول الحجز
    Frontend->>API: PUT /bookings/{id}/status
    API->>Booking: تحديث الحالة
    Booking-->>API: حالة مُحدثة
    
    Customer->>Frontend: بدء الدفع
    Frontend->>API: POST /payments/create-intent
    API->>Payment: إنشاء نية دفع
    Payment-->>API: نية دفع مُنشأة
    
    Customer->>Frontend: إتمام الدفع
    Frontend->>API: POST /payments/confirm
    API->>Payment: تأكيد الدفع
    Payment-->>API: دفع مُؤكد
    
    API->>Booking: تحديث حالة الدفع
    Booking-->>API: حالة مُحدثة
    API-->>Frontend: تأكيد الدفع
    
    API->>Notification: إشعار بدء التنفيذ
    Notification-->>Provider: يمكنك البدء
    
    Provider->>Frontend: بدء الخدمة
    Frontend->>API: PUT /bookings/{id}/start
    API->>Booking: تحديث الحالة
    Booking-->>API: قيد التنفيذ
    
    Provider->>Frontend: طلب تأكيد الإكمال
    Frontend->>API: PUT /bookings/{id}/request-completion
    API->>Notification: إشعار العميل
    Notification-->>Customer: يرجى المراجعة
    
    Customer->>Frontend: تأكيد الإكمال
    Frontend->>API: PUT /bookings/{id}/complete
    API->>Booking: تحديث الحالة
    Booking-->>API: مكتمل
    
    API->>Payment: تفعيل الصرف
    Payment-->>API: أهلية الصرف
    API-->>Customer: تأكيد الإكمال
```

---

## 7. معالجة الأخطاء والاستثناءات

### 7.1 سيناريوهات الأخطاء الشائعة

#### 7.1.1 أخطاء الحجز

```typescript
// Booking Creation Error Handling
class BookingService {
  async createBooking(data: CreateBookingDto): Promise<Booking> {
    try {
      // Validate service availability
      const service = await this.serviceRepository.findById(data.serviceId);
      if (!service || service.status !== 'active') {
        throw new ServiceNotAvailableException('Service is not available');
      }
      
      // Check provider availability
      const isAvailable = await this.checkProviderAvailability(
        service.providerId,
        data.scheduledAt
      );
      if (!isAvailable) {
        throw new ProviderNotAvailableException('Provider is not available at requested time');
      }
      
      // Validate selected options
      const validatedOptions = await this.validateServiceOptions(
        data.serviceId,
        data.selectedOptions
      );
      
      // Calculate total amount
      const totalAmount = this.calculateTotalAmount(service, validatedOptions);
      
      // Create booking
      const booking = await this.bookingRepository.create({
        ...data,
        totalAmount,
        status: BookingStatus.PENDING
      });
      
      return booking;
    } catch (error) {
      if (error instanceof ServiceException) {
        throw error;
      }
      
      this.logger.error('Failed to create booking', error);
      throw new InternalServerErrorException('Failed to create booking');
    }
  }
}
```

#### 7.1.2 أخطاء الدفع

```typescript
// Payment Processing Error Handling
class PaymentService {
  async processPayment(bookingId: string, amount: number): Promise<PaymentResult> {
    try {
      // Validate booking exists and is ready for payment
      const booking = await this.bookingRepository.findById(bookingId);
      if (!booking) {
        throw new BookingNotFoundException('Booking not found');
      }
      
      if (booking.status !== BookingStatus.CONFIRMED) {
        throw new InvalidBookingStatusException('Booking is not ready for payment');
      }
      
      // Create payment intent with Stripe
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'sar',
        metadata: {
          bookingId,
          serviceId: booking.serviceId
        }
      });
      
      // Create payment record
      const payment = await this.paymentRepository.create({
        bookingId,
        amount,
        paymentIntentId: paymentIntent.id,
        status: PaymentStatus.PROCESSING
      });
      
      return {
        paymentId: payment.id,
        clientSecret: paymentIntent.client_secret,
        status: payment.status
      };
      
    } catch (stripeError: any) {
      if (stripeError.type === 'StripeCardError') {
        throw new PaymentFailedException(stripeError.message);
      }
      
      if (stripeError.type === 'StripeRateLimitError') {
        throw new RateLimitExceededException('Payment service rate limit exceeded');
      }
      
      this.logger.error('Stripe payment error', stripeError);
      throw new PaymentProcessingException('Payment processing failed');
    }
  }
}
```

### 7.2 معالجة الاستثناءات

#### 7.2.1 استراتيجية إعادة المحاولة

```typescript
// Retry Strategy for Failed Operations
class RetryService {
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> {
    const maxRetries = options.maxRetries || 3;
    const delay = options.delay || 1000;
    const backoff = options.backoff || 2;
    
    let lastError: Error;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on certain errors
        if (this.isNonRetryableError(error)) {
          throw error;
        }
        
        // Calculate delay with exponential backoff
        const waitTime = delay * Math.pow(backoff, attempt);
        
        this.logger.warn(`Attempt ${attempt + 1} failed, retrying in ${waitTime}ms`, error);
        
        await this.delay(waitTime);
      }
    }
    
    throw new MaxRetriesExceededException(`Operation failed after ${maxRetries} attempts`, lastError);
  }
  
  private isNonRetryableError(error: any): boolean {
    return error instanceof ValidationException ||
           error instanceof UnauthorizedException ||
           error instanceof ForbiddenException;
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

#### 7.2.2 معالجة النزاعات

```typescript
// Dispute Resolution Flow
class DisputeService {
  async raiseDispute(bookingId: string, reason: string, evidence: any[]): Promise<Dispute> {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) {
      throw new BookingNotFoundException('Booking not found');
    }
    
    if (booking.status !== BookingStatus.REVIEW) {
      throw new InvalidBookingStatusException('Dispute can only be raised during review phase');
    }
    
    const dispute = await this.disputeRepository.create({
      bookingId,
      reason,
      evidence,
      status: 'open',
      raisedBy: 'customer'
    });
    
    // Freeze the booking and payment
    await this.bookingRepository.updateStatus(bookingId, BookingStatus.DISPUTE);
    await this.paymentService.holdPayment(booking.paymentId);
    
    // Notify all parties
    await this.notificationService.notifyDisputeRaised(dispute);
    
    return dispute;
  }
  
  async resolveDispute(disputeId: string, resolution: DisputeResolution): Promise<void> {
    const dispute = await this.disputeRepository.findById(disputeId);
    if (!dispute) {
      throw new DisputeNotFoundException('Dispute not found');
    }
    
    switch (resolution.action) {
      case 'refund':
        await this.processRefund(dispute.bookingId, disputeId);
        break;
      case 'release_payment':
        await this.releasePayment(dispute.bookingId);
        break;
      case 'partial_refund':
        await this.processPartialRefund(dispute.bookingId, resolution.amount);
        break;
    }
    
    await this.disputeRepository.updateStatus(disputeId, 'resolved');
    await this.notificationService.notifyDisputeResolved(dispute, resolution);
  }
}
```

---

## 8. أمثلة التنفيذ

### 8.1 مكون React للتدفق

```tsx
// BookingFlow Component
import React, { useState, useEffect } from 'react';
import { useBookingStore } from '@/stores/bookingStore';
import { usePayment } from '@/hooks/usePayment';
import { BookingStatus } from '@/types/booking';

interface BookingFlowProps {
  serviceId: string;
  onComplete?: (booking: Booking) => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ 
  serviceId, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [booking, setBooking] = useState<Booking | null>(null);
  
  const { createBooking, updateBooking, getBooking } = useBookingStore();
  const { processPayment, confirmPayment } = usePayment();
  
  const steps = [
    'service-selection',
    'options-config',
    'date-time',
    'review',
    'payment',
    'confirmation'
  ];
  
  const handleCreateBooking = async (bookingData: CreateBookingData) => {
    try {
      const newBooking = await createBooking({
        serviceId,
        ...bookingData
      });
      
      setBooking(newBooking);
      setCurrentStep(4); // Move to payment step
      
    } catch (error) {
      console.error('Failed to create booking:', error);
      // Handle error with user feedback
      showErrorNotification('Failed to create booking. Please try again.');
    }
  };
  
  const handlePayment = async (paymentMethod: PaymentMethod) => {
    if (!booking) return;
    
    try {
      const paymentResult = await processPayment({
        bookingId: booking.id,
        amount: booking.totalAmount,
        paymentMethod
      });
      
      if (paymentResult.status === 'succeeded') {
        await confirmPayment(booking.id, paymentResult.paymentIntentId);
        setCurrentStep(5); // Move to confirmation
        onComplete?.(booking);
      }
      
    } catch (error) {
      console.error('Payment failed:', error);
      showErrorNotification('Payment failed. Please try a different payment method.');
    }
  };
  
  const renderStepContent = () => {
    switch (steps[currentStep]) {
      case 'service-selection':
        return <ServiceSelection onSelect={handleServiceSelect} />;
      case 'options-config':
        return <OptionsConfiguration serviceId={serviceId} onConfigure={handleOptionsConfigure} />;
      case 'date-time':
        return <DateTimeSelection onSelect={handleDateTimeSelect} />;
      case 'review':
        return <BookingReview booking={booking} onConfirm={handleCreateBooking} />;
      case 'payment':
        return <PaymentForm onPay={handlePayment} amount={booking?.totalAmount} />;
      case 'confirmation':
        return <BookingConfirmation booking={booking} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="booking-flow">
      <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
      
      <div className="booking-flow__content">
        {renderStepContent()}
      </div>
      
      <div className="booking-flow__actions">
        {currentStep > 0 && (
          <button 
            onClick={() => setCurrentStep(currentStep - 1)}
            className="btn btn-secondary"
          >
            السابق
          </button>
        )}
        
        {currentStep < steps.length - 1 && (
          <button 
            onClick={() => setCurrentStep(currentStep + 1)}
            className="btn btn-primary"
            disabled={!isStepValid()}
          >
            التالي
          </button>
        )}
      </div>
    </div>
  );
};
```

### 8.2 مخزن Zustand للحالة

```typescript
// Booking Store with Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookingState {
  currentBooking: Booking | null;
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
}

interface BookingActions {
  createBooking: (data: CreateBookingData) => Promise<Booking>;
  updateBookingStatus: (id: string, status: BookingStatus) => Promise<void>;
  getBooking: (id: string) => Promise<Booking>;
  getBookingsByProvider: (providerId: string) => Promise<Booking[]>;
  clearError: () => void;
}

export const useBookingStore = create<BookingState & BookingActions>()(
  persist(
    (set, get) => ({
      currentBooking: null,
      bookings: [],
      isLoading: false,
      error: null,
      
      createBooking: async (data) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/v1/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(data)
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create booking');
          }
          
          const result = await response.json();
          const booking = result.data.booking;
          
          set({ 
            currentBooking: booking,
            isLoading: false 
          });
          
          return booking;
          
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false 
          });
          throw error;
        }
      },
      
      updateBookingStatus: async (id, status) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/v1/bookings/${id}/status`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify({ status })
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update booking status');
          }
          
          const result = await response.json();
          const updatedBooking = result.data.booking;
          
          // Update in bookings array
          set(state => ({
            bookings: state.bookings.map(b => 
              b.id === id ? updatedBooking : b
            ),
            currentBooking: state.currentBooking?.id === id 
              ? updatedBooking 
              : state.currentBooking,
            isLoading: false
          }));
          
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false 
          });
          throw error;
        }
      },
      
      getBooking: async (id) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/v1/bookings/${id}`, {
            headers: {
              'Authorization': `Bearer ${getAuthToken()}`
            }
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get booking');
          }
          
          const result = await response.json();
          const booking = result.data.booking;
          
          set({ 
            currentBooking: booking,
            isLoading: false 
          });
          
          return booking;
          
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false 
          });
          throw error;
        }
      },
      
      getBookingsByProvider: async (providerId) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/v1/bookings/provider/${providerId}`, {
            headers: {
              'Authorization': `Bearer ${getAuthToken()}`
            }
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get bookings');
          }
          
          const result = await response.json();
          const bookings = result.data.bookings;
          
          set({ 
            bookings,
            isLoading: false 
          });
          
          return bookings;
          
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false 
          });
          throw error;
        }
      },
      
      clearError: () => set({ error: null })
    }),
    {
      name: 'booking-store',
      partialize: (state) => ({
        currentBooking: state.currentBooking,
        bookings: state.bookings
      })
    }
  )
);
```

### 8.3 التحقق من صحة البيانات

```typescript
// Validation Schemas with Zod
import { z } from 'zod';

// Service Option Schema
export const serviceOptionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  price: z.number().positive(),
  isRequired: z.boolean(),
  minQuantity: z.number().int().min(0).optional(),
  maxQuantity: z.number().int().min(1).optional()
});

// Booking Creation Schema
export const createBookingSchema = z.object({
  serviceId: z.string().uuid(),
  scheduledAt: z.string().datetime(),
  selectedOptions: z.array(z.object({
    optionId: z.string().uuid(),
    quantity: z.number().int().min(1)
  })).min(1),
  customerNotes: z.string().max(1000).optional()
});

// Payment Schema
export const paymentSchema = z.object({
  bookingId: z.string().uuid(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  paymentMethodId: z.string().optional()
});

// Status Update Schema
export const statusUpdateSchema = z.object({
  status: z.enum([
    'confirmed',
    'cancelled',
    'in_progress',
    'review',
    'completed',
    'dispute'
  ]),
  notes: z.string().max(500).optional()
});

// Custom Error Messages
export const validationMessages = {
  required: 'هذا الحقل مطلوب',
  invalid_uuid: 'معرف غير صالح',
  invalid_date: 'تاريخ غير صالح',
  invalid_amount: 'مبلغ غير صالح',
  max_length: (max: number) => `الحد الأقصى هو ${max} حرف`,
  min_length: (min: number) => `الحد الأدنى هو ${min} حرف`,
  invalid_status: 'حالة غير صالحة'
};
```

---

## 9. التوافق والإصدارات

### 9.1 متطلبات النظام

#### 9.1.1 المتطلبات الأساسية

```bash
# Node.js Requirements
node --version  # >= 20.0.0
npm --version   # >= 10.0.0

# Database Requirements
postgresql --version  # >= 15.0
redis-server --version  # >= 7.0

# Development Tools
git --version  # >= 2.30.0
```

#### 9.1.2 متطلبات المتصفح

| المتصفح | الإصدار الأدنى | الملاحظات |
|---------|------------------|-----------|
| Chrome | 90+ | موصى به للتطوير |
| Firefox | 88+ | مدعوم بالكامل |
| Safari | 14+ | مدعوم بالكامل |
| Edge | 90+ | مدعوم بالكامل |
| Mobile Browsers | iOS 14+, Android 8+ | متجاوب بالكامل |

### 9.2 توافق واجهات برمجة التطبيقات

#### 9.2.1 إصدارات API

```http
# API Version Header
GET /api/v1/bookings
Accept: application/json
X-API-Version: 1.0
```

#### 9.2.2 التغييرات بين الإصدارات

**الإصدار 1.0 (الحالي)**
- دعم كامل لتدفق الخدمة
- معالجة المدفوعات عبر Stripe
- نظام الإشعارات الأساسي

**الإصدار 1.1 (قريباً)**
- دعم ل multiple payment providers
- نظام تقييم محسن
- ميزات الاشتراك المتقدمة

### 9.3 توافق قاعدة البيانات

#### 9.3.1 الترحيلات

```sql
-- Migration Example
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES users(id),
    service_id UUID NOT NULL REFERENCES services(id),
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    selected_options JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_service_id ON bookings(service_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled_at ON bookings(scheduled_at);
```

#### 9.3.2 التوافق الخلفي

```typescript
// Database Compatibility Layer
class DatabaseCompatibilityService {
  async checkCompatibility(): Promise<CompatibilityReport> {
    const currentVersion = await this.getDatabaseVersion();
    const requiredVersion = '1.0.0';
    
    if (this.compareVersions(currentVersion, requiredVersion) < 0) {
      return {
        compatible: false,
        message: `Database version ${currentVersion} is not compatible. Required: ${requiredVersion}`,
        migrations: await this.getRequiredMigrations(currentVersion, requiredVersion)
      };
    }
    
    return {
      compatible: true,
      message: 'Database is compatible',
      migrations: []
    };
  }
  
  private compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const part1 = parts1[i] || 0;
      const part2 = parts2[i] || 0;
      
      if (part1 < part2) return -1;
      if (part1 > part2) return 1;
    }
    
    return 0;
  }
}
```

---

## 10. دليل البدء السريع

### 10.1 إعداد البيئة

#### 10.1.1 المتطلبات المسبقة

```bash
# Install Node.js (using nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# Install PostgreSQL
# macOS
brew install postgresql@15
brew services start postgresql@15

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install postgresql-15 postgresql-contrib

# Install Redis
# macOS
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt-get install redis-server
sudo systemctl start redis-server
```

#### 10.1.2 إعداد المشروع

```bash
# Clone the repository
git clone https://github.com/your-org/services-platform.git
cd services-platform

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Configure environment variables
# Edit .env.local with your settings:
# - Database connection
# - Redis connection
# - Stripe keys
# - JWT secrets
```

### 10.2 إعداد قاعدة البيانات

```bash
# Create database
createdb services_platform

# Run migrations
npm run db:migrate

# Run seeds (optional)
npm run db:seed

# Verify setup
npm run db:verify
```

### 10.3 التكوين الأساسي

#### 10.3.1 متغيرات البيئة

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/services_platform

# Redis
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Payment (Stripe)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Application
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000
```

#### 10.3.2 تكوين الخدمات

```typescript
// config/services.ts
export const servicesConfig = {
  booking: {
    maxActiveBookings: 100,
    cancellationWindow: 24 * 60 * 60 * 1000, // 24 hours
    confirmationTimeout: 30 * 60 * 1000, // 30 minutes
    autoCompleteDelay: 7 * 24 * 60 * 60 * 1000 // 7 days
  },
  
  payment: {
    supportedCurrencies: ['SAR', 'USD', 'EUR'],
    defaultCurrency: 'SAR',
    refundWindow: 30 * 24 * 60 * 60 * 1000, // 30 days
    disputeWindow: 7 * 24 * 60 * 60 * 1000 // 7 days
  },
  
  notifications: {
    channels: ['in_app', 'email', 'sms'],
    defaultChannel: 'in_app',
    batchSize: 100,
    retryAttempts: 3
  }
};
```

### 10.4 تشغيل التطبيق

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start

# With debugging
DEBUG=services:* npm run dev
```

### 10.5 اختبار التكامل

```bash
# Run tests
npm test

# Run integration tests
npm run test:integration

# Run API tests
npm run test:api

# Generate test coverage
npm run test:coverage
```

### 10.6 التحقق من التكامل

```bash
# Health check
curl http://localhost:3000/api/health

# API documentation
curl http://localhost:3000/api/docs

# Test booking flow
curl -X POST http://localhost:3000/api/v1/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "serviceId": "test-service-id",
    "scheduledAt": "2024-01-20T10:00:00Z",
    "selectedOptions": [
      {
        "optionId": "test-option-id",
        "quantity": 1
      }
    ]
  }'
```

---

## ملخص

يوفر هذا التوثيق الشامل إطاراً كاملاً لفهم وتنفيذ تدفق الخدمة في نظام إدارة الخدمات. يغطي جميع الجوانب من التصميم المعماري إلى التنفيذ العملي، مما يجعله مرجعاً موثوقاً للمطورين والمهندسين.

### النقاط الرئيسية:
- **الهندسة المعمارية**: بنية ميكروخدمية قابلة للتوسع
- **APIs**: واجهات برمجة تطبيقات كاملة مع معالجة الأخطاء
- **التنفيذ**: أمثلة عملية مع كود قابل للاستخدام
- **التوافق**: دعم متعدد المنصات والإصدارات
- **البدء السريع**: دليل خطوة بخطوة للإعداد

لأية أسئلة أو دعم فني، يرجى الرجوع إلى قسم المساعدة أو التواصل مع فريق التطوير.