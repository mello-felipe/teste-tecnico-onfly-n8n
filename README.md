![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-random
Este Node customizado para o n8n recebe um range de números inteiros(max e min) e gera um número aleatório.

## Pré-requisitos

* Git
* Docker
* Node.js

## Usando este conector

Esses são os passos básicos para a instalação e utilização deste conector.

1. Clonar o repositório:
```bash
git clone https://github.com/mello-felipe/teste-tecnico-onfly-n8n.git
cd teste-tecnico-onfly-n8n
```
2. Instalar as dependências:
```bash
npm install
```
3. Crie o arquivo de variáveis de ambiente na raíz do repositório:

	**Observação**: O arquivo .env foi incluído no repositório apenas para
	facilitar a avaliação técnica, contendo credenciais de desenvolvimento local. Estou ciente de que essa não é uma prática recomendada para projetos reais.
```bash
# Cria um arquivo .env na raiz do projeto
cat > .env << EOL
POSTGRES_USER=n8n_user
POSTGRES_PASSWORD=n8n_password
POSTGRES_DB=n8n_db
POSTGRES_NON_ROOT_USER=n8n_user
POSTGRES_NON_ROOT_PASSWORD=n8n_password
EOL
```

4. Compilar o custom node
```bash
npm run build
```

5. Executar o ambiente Docker:
```bash
docker-compose up -d
```
```bash
# Para verificar se os serviços estão rodando:
docker-compose ps
```
6. Acessar o n8n:
   * Abrir o navegador em: http://localhost:5678
   * Configure uma conta de usuário inicial
7.  Para testar o custom node:
    * Criar um novo workflow
    * Adicionar um node "Manual Trigger"
    * Adicionar o node "Random"
    * Configurar os parâmetros "Min" e "Max"
    * Executar o workflow

## Troubleshooting:
* Se o node não aparecer: Verifique se npm run build foi executado
* Se der erro de banco: Verifique se as variáveis no .env estão corretas
* Para ver logs: docker-compose logs -f n8n
