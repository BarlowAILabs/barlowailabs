import requests
from django.shortcuts import render
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from django.conf import settings
from django.http import JsonResponse
import os
import logging


def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html') 

def price(request):
    return render(request, 'price.html')      

def privacy(request):
    return render(request, 'privacy.html')

def terms(request):
    return render(request, 'terms.html')

logger = logging.getLogger(__name__)

def contact_form(request):
    if request.method == 'POST':
        # ✅ reCAPTCHA validation
        recaptcha_response = request.POST.get('g-recaptcha-response')
        if not recaptcha_response:
            return JsonResponse({'message': 'reCAPTCHA verification failed.'}, status=400)

        recaptcha_check = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data={
                'secret': settings.RECAPTCHA_SECRET_KEY,
                'response': recaptcha_response
            }
        )
        result = recaptcha_check.json()

        if not result.get('success'):
            return JsonResponse({'message': 'reCAPTCHA verification failed.'}, status=400)

        # --- Proceed with form logic after successful reCAPTCHA ---
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        from_email = settings.EMAIL_HOST_USER
        to_email = settings.EMAIL_HOST_USER

        contact_message = EmailMessage(
            subject, 
            message, 
            from_email, 
            [to_email],
            reply_to=[email],
        )
        try:
            contact_message.send()
        except Exception as e:
            logger.error(f"Error sending contact email: {e}")
            return JsonResponse({'message': 'Error sending message. Please try again later.'}, status=500)

        # Auto-response email
        google_form_link = "https://docs.google.com/forms/d/e/1FAIpQLScsGNySFzLaWvSRbq9SJbsoU32LFleLB2jwJitu7xT9Nr_qVw/viewform?usp=header"
        google_form_link_text = "Click here to fill the form"

        automated_message = f"""
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            <p>Dear {name},</p>
            <p>Thank you for contacting Barlow AI Labs for your web development needs!</p>
            <p>Please complete our brief questionnaire: <a href="{google_form_link}" style="color: #007bff;">{google_form_link_text}</a></p>
            <p>We look forward to collaborating with you!</p>
            <div style="padding-top: 20px;">Best regards,<br>Barlow AI Labs</div>
        </div>
        """

        automated_email = EmailMessage(
            "Thank you for contacting Barlow AI Labs!",
            automated_message,
            from_email,
            [email],
        )
        automated_email.content_subtype = 'html'
        automated_email.plain_text_content = f"""
        Dear {name},

        Thank you for contacting Barlow AI Labs!

        To get started, please complete our questionnaire: {google_form_link}

        We look forward to working with you!

        Best regards,
        Barlow AI Labs
        """

        try:
            automated_email.send()
        except Exception as e:
            logger.error(f"Error sending automated email: {e}")

        return JsonResponse({'message': 'Your message has been sent successfully!'}, status=200)

    return render(request, 'contact.html', {
        'RECAPTCHA_SITE_KEY': settings.RECAPTCHA_SITE_KEY
    })


