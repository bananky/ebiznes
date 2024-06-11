from flask import Flask, request, jsonify, render_template
import random  
import requests
from kotlin_data import categories, products  

app = Flask(__name__)


openings = [
    "Dzień dobry, mam nadzieję, że jest Pan/Pani w dobrym nastroju. Jak mogę pomóc?",
    "Cześć! Co przyniosło Cię tutaj dzisiaj?",
    "Hej! Jak minął Twój dzień? Czego możemy dzisiaj spróbować?",
    "Witaj! Czy jest coś, co mogę zrobić, aby pomóc Ci dzisiaj?",
    "Witaj! Co Cię tu sprowadza? Jestem ciekaw, co mogę dla Ciebie zrobić."
]

closings = [
    "Dziękuję za rozmowę! Jeśli masz jeszcze jakieś pytania, jestem tutaj, aby pomóc.",
    "Jeśli będziesz potrzebować dalszej pomocy, proszę nie wahaj się skontaktować ze mną ponownie.",
    "Dzięki za czas, mam nadzieję, że moje wyjaśnienia były pomocne. Pozdrawiam!",
    "Jeśli masz więcej pytań lub potrzebujesz dodatkowej pomocy, jestem tutaj do dyspozycji.",
    "Miło było z Tobą porozmawiać! Życzę Ci miłego dnia/dobrego wieczoru!"
]

@app.route('/openings', methods=['GET'])
def get_opening():
    return jsonify(random.choice(openings))


@app.route('/closings', methods=['GET'])
def get_closing():
    return jsonify(random.choice(closings))


@app.route('/categories', methods=['GET'])
def get_categories():
    return jsonify(categories)

@app.route('/products', methods=['POST'])
def get_products():
    data = request.get_json()
    category_name = data.get('category')
    
    category = next((cat for cat in categories if cat.name.lower() == category_name.lower()), None)
    
    if not category:
        return jsonify([])  
    
   
    matching_products = [product for product in products if product.category == category.id]
    
    return jsonify(matching_products)


class ChatGPTService:
    def __init__(self, api_key):
        self.api_key = api_key

    def get_response(self, prompt):
        headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json',
        }
        json_data = {
            'prompt': prompt,
            'max_tokens': 100,
        }
        response = requests.post('https://api.openai.com/v1/engines/davinci-codex/completions', headers=headers, json=json_data)
        response_json = response.json()
        return response_json.get('choices', [{}])[0].get('text', 'No response from ChatGPT')


chat_gpt_service = ChatGPTService(api_key="")  


@app.route('/chatgpt', methods=['POST'])
def chatgpt():
    data = request.get_json()
    prompt = data.get('prompt')
    response = chat_gpt_service.get_response(prompt)
    return jsonify({'response': response})

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
