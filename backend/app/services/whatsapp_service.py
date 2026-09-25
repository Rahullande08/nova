import urllib.parse
from typing import Dict, Any, Optional
import httpx
from backend.app.core.config import settings

class WhatsAppService:
    """
    WhatsApp integration service for Practice Layer.
    - Generates pre-filled direct WhatsApp links (wa.me) for instant one-click sharing by mentors.
    - Prepares Cloud WhatsApp Business API integration when WHATSAPP_API_TOKEN is configured.
    - Clearly distinguishes between DEMO / DIRECT LINK and LIVE CLOUD API.
    """

    def __init__(self):
        self.api_token = settings.WHATSAPP_API_TOKEN
        self.phone_number_id = settings.WHATSAPP_PHONE_NUMBER_ID

    def generate_direct_link(self, message: str, phone: Optional[str] = None) -> str:
        """Generates a universal WhatsApp direct-send URL"""
        encoded_text = urllib.parse.quote(message)
        if phone:
            clean_phone = phone.replace("+", "").replace("-", "").replace(" ", "")
            return f"https://wa.me/{clean_phone}?text={encoded_text}"
        return f"https://api.whatsapp.com/send?text={encoded_text}"

    async def send_message(self, recipient_phone: str, message: str) -> Dict[str, Any]:
        """
        Dispatches message via WhatsApp Business API if credentials exist;
        otherwise returns DEMO/DIRECT LINK payload without throwing.
        """
        direct_link = self.generate_direct_link(message=message, phone=recipient_phone)

        if self.api_token and self.phone_number_id:
            url = f"https://graph.facebook.com/v19.0/{self.phone_number_id}/messages"
            headers = {
                "Authorization": f"Bearer {self.api_token}",
                "Content-Type": "application/json"
            }
            payload = {
                "messaging_product": "whatsapp",
                "to": recipient_phone,
                "type": "text",
                "text": {"body": message}
            }
            try:
                async with httpx.AsyncClient(timeout=10) as client:
                    res = await client.post(url, json=payload, headers=headers)
                    if res.status_code in [200, 201]:
                        data = res.json()
                        return {
                            "status": "LIVE_API_SENT",
                            "messageId": data.get("messages", [{}])[0].get("id"),
                            "directLink": direct_link
                        }
                    else:
                        print(f"[WhatsAppService] Cloud API error: {res.status_code}")
            except Exception as e:
                print(f"[WhatsAppService] Cloud API dispatch exception: {type(e).__name__}")

        # Demo / Direct Link mode
        return {
            "status": "DEMO_DIRECT_LINK",
            "directLink": direct_link,
            "draftMessage": message,
            "note": "Ready for mentor one-click delivery or WhatsApp web dispatch."
        }

whatsapp_service = WhatsAppService()
