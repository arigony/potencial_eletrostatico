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
