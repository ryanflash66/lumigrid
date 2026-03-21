# Contact Form Documentation

## Overview

The enhanced contact form (`src/components/forms/contact-form.tsx`) is a lead generation form optimized for conversion with comprehensive validation, real-time feedback, and Formspree integration.

## Form Structure

### Required Fields

1. **Full Name** (`fullName`)
   - Type: Text input
   - Validation: Minimum 2 characters, maximum 100 characters
   - Auto-complete: `name`

2. **Email** (`email`)
   - Type: Email input
   - Validation: RFC 5322 compliant email pattern
   - Auto-complete: `email`

3. **Phone** (`phone`)
   - Type: Tel input
   - Validation: International phone format support
   - Auto-complete: `tel`
   - Format examples: `+1 (415) 555-1234`, `(415) 555-1234`, `415-555-1234`

4. **Project Details** (`message`)
   - Type: Textarea
   - Validation: Minimum 10 characters, maximum 500 characters
   - Character counter displayed

### Optional Fields

5. **Company** (`company`)
   - Type: Text input
   - Validation: Maximum 100 characters (only if provided)
   - Auto-complete: `organization`

6. **Project Type** (`projectType`)
   - Type: Select dropdown
   - Options:
     - Website Development
     - Website Redesign
     - E-commerce Platform
     - Web Application
     - Landing Page
     - Other

7. **Budget Range** (`budgetRange`)
   - Type: Select dropdown
   - Options:
     - Under $5,000
     - $5,000 - $10,000
     - $10,000 - $25,000
     - $25,000 - $50,000
     - $50,000+
     - Custom Quote

### Spam Protection

8. **Website** (`website`) - Honeypot Field
   - Hidden from users (screen reader and visually)
   - If filled, submission is silently accepted (bot detection)
   - Not submitted to Formspree

## Validation Rules

### Real-Time Validation

- Fields are validated on blur (when user leaves the field)
- Errors clear as user types
- Visual feedback with red borders and error messages

### Validation Patterns

#### Email
```javascript
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
```

#### Phone
```javascript
/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}[-\s\.]?[0-9]{1,9}$/
```

### Error Messages

- Clear, actionable error messages
- Displayed inline below each field
- Accessible via ARIA attributes (`role="alert"`, `aria-describedby`)

## Formspree Integration

### Field Mapping

The form maps fields to Formspree format:

| Form Field | Formspree Field Name | Required |
|------------|---------------------|----------|
| `fullName` | `name` | Yes |
| `email` | `email` | Yes |
| `phone` | `phone` | Yes |
| `company` | `company` | No (only if provided) |
| `projectType` | `project_type` | No (only if selected) |
| `budgetRange` | `budget_range` | No (only if selected) |
| `message` | `message` | Yes |

### Configuration

1. **Create Formspree Account**
   - Sign up at https://formspree.io
   - Verify your email address

2. **Create New Form**
   - Log in to Formspree dashboard
   - Click "New Form"
   - Copy the form endpoint URL

3. **Set Environment Variable**
   - Create `.env.local` file in project root
   - Add: `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID`
   - Replace `YOUR_FORM_ID` with your actual form ID

4. **Test Submission**
   - Submit a test form entry
   - Verify data appears in Formspree dashboard
   - Check email notifications (if configured)

### Error Handling

The form handles Formspree errors gracefully:

- Network errors: Generic error message
- Formspree API errors: Displays specific error messages from Formspree
- Validation errors: Client-side validation prevents invalid submissions

### Development Mode

When `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is not set:
- Form simulates submission (800ms delay)
- Shows success message
- Allows testing without Formspree account

## Accessibility Features

### ARIA Attributes

- **Labels**: All fields have associated `<label>` elements
- **Error Messages**: `role="alert"` and `aria-describedby` for screen readers
- **Invalid Fields**: `aria-invalid` set to `true` when errors exist
- **Status Messages**: `aria-live` for dynamic content updates
- **Loading State**: `aria-busy` on submit button during submission

### Keyboard Navigation

- All fields are keyboard accessible
- Tab order follows logical form flow
- Honeypot field excluded from tab order (`tabIndex={-1}`)
- First error field receives focus on validation failure

### Screen Reader Support

- Semantic HTML structure
- Descriptive error messages
- Status announcements for form submission
- Hidden honeypot field properly marked (`aria-hidden="true"`)

## User Experience Features

### Visual Feedback

- **Focus States**: Clear ring indicators on focused fields
- **Error States**: Red borders and error messages
- **Loading State**: Spinner animation and disabled inputs
- **Success State**: Green success message with auto-dismiss

### Character Counter

- Real-time character count for message field
- Warning color when approaching limit (90% of max)
- Maximum length: 500 characters

### Form States

1. **Idle**: Ready for input
2. **Loading**: Submission in progress (all inputs disabled)
3. **Success**: Success message displayed, form reset after 5 seconds
4. **Error**: Error message displayed, form remains filled

## Usage

### Basic Usage

```tsx
import { ContactForm } from '@/components/forms/contact-form'

export default function ContactPage() {
  return (
    <div>
      <ContactForm />
    </div>
  )
}
```

### Compact Mode

For smaller spaces or inline forms:

```tsx
<ContactForm compact={true} />
```

## Styling

The form uses Tailwind CSS classes and integrates with the design system:

- Uses `cn()` utility for conditional classes
- Respects theme (light/dark mode)
- Responsive design (mobile-first)
- Consistent spacing and typography

### Customization

To customize styling, modify the className props in the component. The form uses:

- Design tokens from `globals.css`
- shadcn/ui Button component
- Consistent border radius (`rounded-xl`, `rounded-2xl`)
- Focus rings and transitions

## Best Practices Implemented

### Formspree Best Practices

✅ Single-column layout  
✅ Clear labels above fields  
✅ Required fields marked with asterisk  
✅ Optional fields clearly labeled  
✅ Inline validation with descriptive errors  
✅ Honeypot spam protection  
✅ Proper Formspree field mapping  
✅ AJAX submission (no page reload)  

### Lead Generation Best Practices

✅ Minimal required fields (4 core fields)  
✅ Optional fields for better qualification  
✅ Progressive disclosure (optional fields don't overwhelm)  
✅ Clear value proposition in placeholder text  
✅ Real-time validation feedback  
✅ Character limits with visual indicators  
✅ Mobile-responsive design  

## Troubleshooting

### Form Not Submitting

1. Check `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is set in `.env.local`
2. Verify Formspree form is active
3. Check browser console for errors
4. Verify network tab shows POST request to Formspree

### Validation Not Working

1. Ensure JavaScript is enabled
2. Check browser console for errors
3. Verify all required fields have values
4. Check field format matches validation patterns

### Accessibility Issues

1. Test with keyboard navigation (Tab key)
2. Test with screen reader (NVDA, JAWS, VoiceOver)
3. Verify ARIA attributes are present
4. Check color contrast ratios

## Future Enhancements

Potential improvements:

- Multi-step form wizard for longer forms
- File upload support
- reCAPTCHA integration for additional spam protection
- Custom success page redirect
- Form analytics integration
- A/B testing capabilities
- Conditional field display based on selections

## Support

For issues or questions:

1. Check Formspree documentation: https://help.formspree.io
2. Review form validation patterns
3. Test in development mode first
4. Check browser console for errors

