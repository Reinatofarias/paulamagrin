# PRD — Landing Page de Alta Conversão | Paula Magrin

**Versão:** 1.0  
**Data:** 2026-08-12  
**Autor:** Equipe de Desenvolvimento  
**Status:** Draft — Aguardando Aprovação

---

## 1. Visão Geral do Produto

### 1.1 Resumo Executivo

Landing page de alta conversão para **Paula Magrin, Terapeuta**, focada em transformar visitantes provenientes de anúncios pagos, Instagram e tráfego direto em leads qualificados. O público-alvo principal são mulheres maduras (40–60 anos) que reconhecem padrões emocionais e comportamentais repetitivos em suas vidas e buscam compreensão e transformação por meio de um processo terapêutico fundamentado.

### 1.2 Problema a Resolver

Mulheres maduras, inteligentes e experientes que:
- Construíram suas vidas cuidando de outros e perderam contato com a própria identidade
- Reconhecem padrões repetitivos mas não conseguem quebrá-los sozinhas
- Buscam ajuda profissional mas desconfiam de promessas vazias da internet
- Precisam de uma profissional que combine profundidade de compreensão com aplicabilidade prática

Atualmente não existe um ponto de conversão digital que:
- Gere identificação imediata com o público
- Comunique o diferencial de Paula com clareza
- Conduza emocionalmente a visitante até o CTA
- Capture leads qualificados com dados de rastreamento

### 1.3 Proposta de Valor

> Uma mulher não precisa passar o restante da vida sendo fiel à identidade que construiu para sobreviver.

A landing page comunica o conceito de **RECONSTRUÇÃO DE IDENTIDADE** — a passagem de uma identidade construída para sobreviver para uma identidade baseada em escolhas conscientes.

---

## 2. Objetivos e Métricas

### 2.1 Objetivo Principal

Converter visitantes em leads qualificados que iniciem uma conversa com Paula Magrin.

### 2.2 KPIs Primários

| Métrica | Meta Inicial | Benchmark Premium |
|---|---|---|
| Taxa de conversão (formulário) | ≥ 3% | ≥ 5% |
| Taxa de scroll até seção CTA | ≥ 40% | ≥ 55% |
| Tempo médio na página | ≥ 2min30s | ≥ 4min |
| Taxa de rejeição | ≤ 65% | ≤ 50% |
| Leads qualificados / Total leads | ≥ 60% | ≥ 75% |

### 2.3 KPIs Secundários

| Métrica | Meta |
|---|---|
| LCP (Largest Contentful Paint) | ≤ 2.5s |
| FID (First Input Delay) | ≤ 100ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 |
| Pontuação PageSpeed Mobile | ≥ 85 |

---

## 3. Público-Alvo

### 3.1 Persona Primária

**Nome:** "Mulher em Reconstrução"  
**Idade:** 40–60 anos  
**Perfil socioeconômico:** Classes A/B  
**Perfil profissional:** Empresárias, executivas, profissionais liberais, líderes, carreiras consolidadas  
**Estado civil:** Variado — casadas, separadas, em transição  
**Nível digital:** Médio — usa WhatsApp, Instagram, navegação básica

### 3.2 Estado Emocional

- Cansaço emocional acumulado
- Reconhece padrões repetitivos
- Busca clareza, não motivação
- Desconfia de promessas exageradas
- Valoriza profundidade e seriedade
- Precisa sentir-se compreendida antes de confiar

### 3.3 Jornada Mental Esperada na Página

```
"Ela está falando exatamente sobre mim."
        ↓
"Então existe uma razão para eu continuar repetindo isso."
        ↓
"Talvez eu não precise continuar vivendo dessa maneira."
        ↓
"Essa profissional parece entender a raiz do problema."
        ↓
"Quero entender se ela pode me ajudar."
        ↓
      [CTA]
```

---

## 4. Fontes de Tráfego

| Canal | Prioridade | Dispositivo Esperado |
|---|---|---|
| Meta Ads (Instagram/Facebook) | Alta | Mobile (85%+) |
| Instagram orgânico (link na bio) | Média | Mobile (90%+) |
| Google Ads (search) | Média | Mobile/Desktop |
| Tráfego direto | Baixa | Desktop/Mobile |
| Referral | Baixa | Variado |

---

## 5. Requisitos Funcionais

### 5.1 Estrutura de Seções

| # | Seção | Propósito | Prioridade |
|---|---|---|---|
| 01 | Hero | Identificação + CTA imediato | P0 |
| 02 | Identificação | Reconhecimento de padrões | P0 |
| 03 | Reframe / Novo Mecanismo | Mudança de percepção | P0 |
| 04 | Conceito da Reconstrução | Framework conceitual | P0 |
| 05 | O Que Muda na Prática | Áreas trabalhadas | P1 |
| 06 | Sobre Paula | Autoridade + conexão | P0 |
| 07 | Diferencial | Metodologia simplificada | P1 |
| 08 | Para Quem É / Não É | Qualificação | P1 |
| 09 | Prova Social | Depoimentos (quando disponíveis) | P1 |
| 10 | FAQ | Quebra de objeções | P1 |
| 11 | CTA Final | Conversão | P0 |
| 12 | Formulário / Modal | Captura do lead | P0 |
| 13 | Confirmação | Pós-conversão | P1 |

### 5.2 Formulário de Captura

**Campos obrigatórios:**
- Nome
- WhatsApp (com máscara)
- Pergunta de qualificação (seleção única)

**Pergunta de qualificação:**
> "Qual dessas frases mais representa seu momento hoje?"

Opções:
1. Sinto que perdi um pouco de quem eu sou.
2. Percebo padrões que continuo repetindo.
3. Tenho dificuldade de colocar limites.
4. Estou passando por uma fase de transição.
5. Sei que preciso mudar alguma coisa, mas ainda não sei por onde começar.
6. Outro.

**Campos ocultos (automáticos):**
- utm_source, utm_medium, utm_campaign, utm_content, utm_term
- timestamp, referrer, device_type

### 5.3 CTA Flutuante Mobile

- Aparece após primeira rolagem (scroll > 100vh)
- Fixado na parte inferior
- Texto: "Conversar com Paula"
- Discreto, sem animações agressivas
- Não cobre conteúdo essencial
- Desaparece ao chegar na seção do formulário

### 5.4 Tracking e Analytics

**Plataformas:** GA4 · GTM · Meta Pixel

| Evento | Trigger |
|---|---|
| PageView | Carregamento da página |
| ViewContent | Scroll 50% |
| FormStart | Primeiro campo do formulário |
| FormSubmit | Envio do formulário |
| Lead | Formulário concluído com sucesso |
| Contact | Clique em link de contato |
| WhatsAppClick | Clique em link do WhatsApp |
| CTAClick | Clique em qualquer CTA |
| ScrollDepth | 25%, 50%, 75%, 100% |

### 5.5 SEO

- Title tag otimizado
- Meta description
- Open Graph tags (título, descrição, imagem)
- Twitter Card tags
- Schema.org (Person, LocalBusiness quando aplicável)
- HTML semântico, alt text, canonical URL

---

## 6. Requisitos Não-Funcionais

### 6.1 Performance
- LCP ≤ 2.5s · FID ≤ 100ms · CLS ≤ 0.1 · TBT ≤ 200ms
- Lazy loading, otimização de imagens, minificação, preload de fontes

### 6.2 Acessibilidade
- WCAG 2.1 nível AA
- Navegação por teclado, contraste 4.5:1, alt text, focus states, ARIA

### 6.3 Compatibilidade
- Chrome 90+, Safari 14+, Firefox 90+, Edge 90+, iOS Safari 14+, Chrome Android 90+

### 6.4 Responsividade
- ≤480px (mobile) · 481–768px (tablet portrait) · 769–1024px (tablet landscape) · 1025–1440px (desktop) · ≥1441px (desktop grande)

---

## 7. Compliance e Ética

### Proibições
- ❌ Cura/tratamento/resultado garantido
- ❌ Título "psicóloga"
- ❌ Depoimentos/credenciais/números inventados
- ❌ Urgência artificial, manipulação emocional
- ❌ Diagnósticos clínicos

### Obrigatório
- ✅ Título "Terapeuta"
- ✅ Apenas informações factuais
- ✅ `[INFORMAÇÃO A CONFIRMAR]` para dados pendentes
- ✅ Linguagem ética e responsável

---

## 8. Dependências

| Item | Status | Impacto |
|---|---|---|
| Fotografias profissionais de Paula | Pendente | Hero, Seção Sobre |
| Depoimentos reais | Pendente | Prova Social |
| Credenciais detalhadas | Pendente | Autoridade |
| Identidade visual oficial | Pendente | Design |
| Processo comercial | Pendente | Microcopy CTA |
| Link do WhatsApp | Pendente | CTA / Formulário |
| Domínio e hospedagem | Pendente | Deploy |

---

## 9. Entregáveis v1.0

- Landing page completa (HTML/CSS/JS)
- Copy final de todas as seções
- Design responsivo (mobile, tablet, desktop)
- Formulário com qualificação
- CTA flutuante mobile
- Microinterações premium
- Estrutura de tracking
- SEO básico
- Modal de confirmação
- 10+ variações de headline
