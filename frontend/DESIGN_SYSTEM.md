# Editorial Noir Design System

This document outlines the UI primitives extracted during the Phase 16 refactor. The design system is strictly focused on maintaining the "Editorial Noir" aesthetic.

## Principles
1. **Glassmorphism**: Heavy use of `bg-surface-container-low/40` and `backdrop-blur-md` for cards and panels.
2. **Minimalism**: Thin borders (`border-white/5`), subtle glows, and deliberate whitespace.
3. **Typography**: High contrast and geometric precision using `font-headline-*` for primary titles and `font-label-caps` for metadata/labels.
4. **Consistency**: Unified behavior for interaction states (hover, focus, active).

## Available Components (`src/components/ui/`)

### 1. Card (`Card.tsx`)
A compound component pattern for constructing cards and panels.

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';

<Card className="hover:-translate-y-1">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content goes here.</CardContent>
  <CardFooter>Footer actions.</CardFooter>
</Card>
```

### 2. KpiCard (`KpiCard.tsx`)
Standardized dashboard metric component.

**Usage:**
```tsx
import { KpiCard } from '@/components/ui/KpiCard';
import { Activity } from 'lucide-react';

<KpiCard
  icon={Activity}
  title="Active Users"
  value="1,234"
  trend={{ value: 12, label: 'vs last week' }}
/>
```

### 3. Button (`Button.tsx`)
Includes `Button` and `IconButton`. Uses CVA for variants (`primary`, `secondary`, `outline`, `ghost`, `danger`).

**Usage:**
```tsx
import { Button, IconButton } from '@/components/ui/Button';

<Button variant="primary" loading={isPending}>Save</Button>
<IconButton icon={<Trash2 />} variant="danger" />
```

### 4. Input & FormField (`Input.tsx`, `FormField.tsx`)
Input primitives including standard input and password input with toggle. Wrapped using `FormField` for consistent label and error styling.

**Usage:**
```tsx
import { Input, PasswordInput } from '@/components/ui/Input';
import { FormField } from '@/components/ui/FormField';

<FormField label="Email" error={errors.email?.message}>
  <Input type="email" placeholder="user@catalog.ai" />
</FormField>
```

### 5. Badge (`Badge.tsx`)
Status indicators with various intents.

**Usage:**
```tsx
import { Badge } from '@/components/ui/Badge';

<Badge variant="success">Listening</Badge>
```

### 6. Modal (`Modal.tsx`)
Dialog wrapper based on Radix UI (`@radix-ui/react-dialog`) with Editorial Noir styling.

**Usage:**
```tsx
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';

<Modal open={isOpen} onOpenChange={setIsOpen}>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Confirm</ModalTitle>
    </ModalHeader>
  </ModalContent>
</Modal>
```

### 7. EmptyState & Skeleton (`EmptyState.tsx`, `Skeleton.tsx`)
Standardized loading placeholders and empty states.

**Usage:**
```tsx
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';

<EmptyState icon={Search} title="No Results" />
<Skeleton className="w-full h-32 rounded-xl" />
```

## Migration & Future Usage
When building new features or refactoring legacy components, ALWAYS use these primitives instead of creating custom duplicated Tailwind configurations.

- **Do not modify the backend.**
- **Preserve functional compatibility.**
- **Adhere to the glassmorphic dark theme patterns.**
