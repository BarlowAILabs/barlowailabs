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

        google_form_link = "https://docs.google.com/forms/d/e/1FAIpQLScsGNySFzLaWvSRbq9SJbsoU32LFleLB2jwJitu7xT9Nr_qVw/viewform?usp=header"  # Set your Google Form link here
        google_form_link_text = "Click here to fill the form" # Customize the link text

        automated_message = f"""
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            <p style="margin-bottom: 10px; line-height: 1.6;">
                Dear {name},
            </p>

            <p style="margin-bottom: 10px; line-height: 1.6; color: #333">
                Thank you for contacting Barlow AI Labs for your web development needs! We're excited to learn more about your project.
            </p>

            <p style="margin-bottom: 10px; line-height: 1.6;color: #333">
                To get started, please complete our brief questionnaire: <a href="{google_form_link}" style="color: #007bff; text-decoration: none;">{google_form_link_text}</a>
            </p>

            <p style="margin-bottom: 10px; line-height: 1.6;color: #333">
                This will help us understand your vision and goals so we can create a website that perfectly meets your needs. We look forward to collaborating with you!
            </p>

            <div style="text-align: left; padding-top: 20px; font-family: Arial, sans-serif; font-size: 14px; color: #666;">
                Best regards,<br>
                Barlow AI Labs
            </div>
        </div>
        """

        automated_email = EmailMessage(
            "Thank you for contacting Barlow AI Labs!",  # Subject
            automated_message.format(name=name),  # Use .format()
            from_email,
            [email],
        )

        # Set content subtype to HTML
        automated_email.content_subtype = 'html'

        # Plain text version
        plain_text_message = f"""
        Dear {name},

        Thank you for contacting Barlow AI Labs!

        To get started, please complete our questionnaire: {google_form_link}

        We look forward to working with you!

        Best regards,
        Barlow AI Labs
        """

        automated_email.plain_text_content = plain_text_message

        try:
            automated_email.send()
        except Exception as e:
            logger.error(f"Error sending automated email: {e}")

        return JsonResponse({'message': 'Your message has been sent successfully!'}, status=200)

    return render(request, 'contact.html')


