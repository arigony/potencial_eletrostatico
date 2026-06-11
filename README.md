# Potencial Eletrostatico Molecular

Protótipo educacional inspirado no fluxo do MolCalc:

```text
Aluno desenha ou escolhe molecula
        ↓
Motor calcula geometria simples e cargas aproximadas
        ↓
Site mostra estrutura 3D, cargas parciais, dipolo,
mapa eletrostatico colorido e explicacao organica
```

## Como abrir localmente

Como o visualizador usa módulos JavaScript via CDN, rode um servidor estático:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Depois abra:

```text
http://localhost:8000
```

Se preferir usar o servidor Node incluído:

```powershell
node dev-server.mjs
```

Ele abre em:

```text
http://127.0.0.1:8765
```

## Segurança local

Use sempre `127.0.0.1` ou `localhost` para testes locais. Assim a página fica acessível apenas no seu próprio computador.

Não rode este protótipo em uma pasta com arquivos privados, porque um servidor estático serve os arquivos da pasta atual. O servidor Node incluído aceita apenas `GET`/`HEAD`, bloqueia caminhos fora da pasta do projeto e escuta somente em `127.0.0.1`.

No GitHub Pages, o projeto é público por natureza. Publique apenas exemplos, moléculas e resultados que possam ser compartilhados.

## Como hospedar no GitHub Pages

1. Envie estes arquivos para um repositório no GitHub.
2. Abra `Settings > Pages`.
3. Em `Build and deployment`, escolha `Deploy from a branch`.
4. Selecione a branch principal e a pasta `/root`.
5. Acesse a URL publicada pelo GitHub Pages.

## Precisao cientifica

Esta primeira versão é didática. As cargas parciais e geometrias são aproximadas e curadas manualmente para moléculas pequenas.

Para maior precisão, o próximo passo é trocar o motor interno por:

- RDKit para gerar conformeros 3D e otimizar geometria simples.
- xTB/GFN2-xTB para geometria e cargas semiempíricas.
- Psi4 para DFT, densidade eletrônica e potencial eletrostático em arquivos `.cube`.
- 3Dmol.js ou Three.js para visualizar superfícies volumétricas.

## Moléculas incluídas

- Água
- Amônia
- Metanol
- Etanol
- Acetona
- Ácido acético
- Benzeno
- Clorometano
- Metil 2-cianoacrilato (`COC(=O)C(=C)C#N`)
- Etil 2-cianoacrilato (`CCOC(=O)C(=C)C#N`)
- Propil 2-cianoacrilato (`CCCOC(=O)C(=C)C#N`)
- Metil 2-fluoroacrilato (`COC(=O)C(F)=C`)
- Metil 2-nitroacrilato (`COC(=O)C([N+](=O)[O-])=C`)
- Metil 2-metilacrilato (`COC(=O)C(C)=C`)
- Metil 2-propilacrilato (`COC(=O)C(CCC)=C`)
