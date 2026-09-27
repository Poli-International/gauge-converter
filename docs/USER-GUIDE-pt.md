# Conversor de calibres de piercing e tabela de tamanhos: manual do utilizador

Este guia esclarece como converter, medir, calibrar e comparar dimensões de joalharia de piercing entre calibres gauge, milímetros e frações de polegada para body piercers profissionais, aprendizes e clientes de estúdio.

## Para que serve

O conversor de calibres para piercing assegura correspondências dimensionais fidedignas entre os três sistemas de medição empregues no body art: calibres numéricos de fio (gauge), milímetros métricos e polegadas imperiais (decimais ou fracionárias). Resolve as discrepâncias comuns decorrentes de tolerâncias fabris distintas, ilustra secções transversais físicas em tamanho real em ecrãs calibrados e identifica joias sem identificação através da pesquisa inversa com paquímetro digital.

## A quem se destina

Esta ferramenta foi desenvolvida para:
- Body piercers profissionais que determinam a espessura inicial da joia de perfuração ou selecionam barras mais curtas para procedimentos de ajuste (downsize).
- Aprendizes de body piercing que estudam as equivalências padronizadas, a origem na American Wire Gauge (AWG) e os locais anatómicos usuais de perfuração inicial.
- Profissionais de receção e responsáveis de inventário que verificam as leituras de paquímetro face às especificações nas embalagens dos fabricantes.
- Clientes de estúdio que pretendem certificar-se de que uma peça é compatível com o canal cicatrizado do seu piercing antes de efetuarem uma compra ou inserção.

## Como utilizar

### Converter entre gauge, milímetros e polegadas

1. Aceda à secção `Conversor de dimensões` na parte superior da interface.
2. Selecione uma espessura de barra no menu pendente `Selecionar calibre / dilatação`. A ferramenta preenche de imediato os campos `Milímetros (mm métrico)` e `Polegadas (in)` com os valores correspondentes.
3. Se preferir, insira uma medida conhecida em qualquer um dos dois campos numéricos. Digitar um valor em `Milímetros (mm métrico)` calcula as polegadas decimais e fracionárias, enquanto a inserção em `Polegadas (in)` calcula os milímetros exatos.
4. Caso a medida introduzida corresponda a um calibre padrão dentro das tolerâncias convencionais, esse gauge é realçado no menu e na tabela. Valores fora das normas comerciais exibem a designação `Medida personalizada`.

### Calibrar o ecrã em escala real

1. Prima `Calibrar escala do ecrã` junto ao título de referência visual para aceder à janela de calibração.
2. Utilize um cartão plástico padrão de acordo com a norma ISO/IEC 7810 ID-1 (cartão bancário ou cartão de cidadão com 85,60 mm de largura).
3. Encoste o cartão físico plano à superfície do seu ecrã, sobre a moldura guia apresentada.
4. Ajuste a barra deslizante horizontal até a largura do retângulo digital coincidir exatamente com os limites do seu cartão físico.
5. Prima `Guardar e aplicar calibração`. O sistema recalcula a densidade real de píxeis e atualiza o indicador de estado de `Padrão de 96 DPI` para a escala calibrada.
6. Para restaurar os valores de fábrica a qualquer altura, prima `Restaurar predefinição (96 DPI)`.

### Inspecionar a referência visual circular ao vivo

1. Observe a representação circular na secção `Referência visual em escala real` após selecionar ou digitar uma medida.
2. Estando o ecrã calibrado, o círculo central retrata o diâmetro físico real da secção transversal do fio selecionado.
3. Consulte os quatro cartões de informação contíguos ao círculo visual: `Calibre gauge:`, `Diâmetro:`, `Polegadas:` e `Fração:`.
4. Se um tamanho alargado de grande calibre exceder a moldura de pré-visualização, a imagem reduz-se proporcionalmente com um aviso explicativo para preservar a nitidez.

### Pesquisa inversa com paquímetro para joias sem identificação

1. Feche integralmente os bicos de medição do paquímetro digital e prima a tecla de zeramento para calibrar a referência inicial.
2. Apoie as faces planas do paquímetro sobre o corpo liso e utilizável da haste ou argola. Nunca meça sobre roscas, esferas de fecho, topos decorativos ou rebordos alargados.
3. Registe três medições cuidadosas ao longo da haste para assegurar que a geometria cilíndrica é uniforme.
4. Navegue até à secção `Meça a sua própria joia (pesquisa inversa)` e introduza o valor obtido em `Espessura medida com paquímetro (mm):`.
5. Prima `Localizar calibre mais próximo`. O utilitário identifica o gauge padrão mais próximo, informa se a joia é superior ou inferior ao padrão e indica o desvio em milímetros.

### Consultar a tabela de referência fidedigna

1. Desça até à secção `Tabela de referência fidedigna de calibres e medidas`.
2. Analise as colunas informativas: `Gauge / Medida`, `AWG correspondente`, `Milímetros comerciais`, `Polegadas aprox.`, `Fração comum mais próxima` e `Locais habituais de perfuração inicial`.
3. Repare nas linhas com duas medidas em milímetros (como 10G, 2G e 00G), as quais traduzem variações reconhecidas entre os fabricantes de joalharia corporal.
4. Prima qualquer linha da tabela para transferir os valores para o conversor e atualizar o círculo em tamanho real.

### Incorporar o conversor no site do seu estúdio

1. Prima o botão `Incorporação gratuita` disponível no cabeçalho superior.
2. Analise o excerto de código iframe responsivo fornecido na janela de diálogo.
3. Prima `Copiar o código` para copiar o código para a área de transferência, ou prima `Descarregar ficheiro HTML` para guardar uma cópia integral autónoma para utilização offline.
4. Cole o código iframe no gestor de conteúdos do site do seu estúdio, dispensando chaves de API ou taxas de licenciamento.

## O que não faz

- Não calcula o comprimento útil de hastes, o diâmetro interior de argolas ou a margem necessária para acomodar o edema tecidular inicial. Para avaliar o comprimento utilizável e o ajuste anatómico, consulte o [Jewelry Size Visualizer](https://poliinternational.com/jewelry-size-visualizer/).
- Não efetua o acompanhamento do plano individual de cicatrização, dos calendários de cuidados posteriores nem de alertas para troca de haste (downsize). Para o registo faseado da cicatrização, utilize o [Healing Tracker](https://poliinternational.com/healing-tracker/).
- Não analisa certificados de fundição metalúrgica, ensaios espectrométricos de ligas ou relatórios de ensaios de biocompatibilidade. Para a validação analítica de titânio e aço de grau cirúrgico, consulte [Material Certification](https://poliinternational.com/material-certification-checker/).

## Onde residem os seus dados

Todos os cálculos, configurações de calibração e opções de tema operam exclusivamente no navegador Web deste dispositivo. Os parâmetros de calibração do ecrã e a preferência pelo modo escuro são salvaguardados localmente no localStorage do seu navegador sob chaves dedicadas. Nenhuma medição registada, dado técnico do dispositivo ou informação pessoal é enviada para servidores externos ou entidades terceiras. Limpar o histórico ou o armazenamento local do navegador repõe de imediato a escala no valor pré-definido de 96 DPI. Caso descarregue o ficheiro HTML autónomo através da janela de incorporação, este preserva o código na íntegra e executa-se em modo offline sem ligação à internet.

## Impressão e exportação

A aplicação integra um módulo de impressão concebido para estúdios profissionais:
1. Prima `Imprimir tabela de parede de 1 página` por baixo da tabela de referência.
2. No menu de impressão do seu sistema operativo, defina obrigatoriamente a escala para 100% (desative opções como "Ajustar à página" ou "Reduzir para caber").
3. Selecione papel A4 ou US Letter e confirme a impressão.
4. Após imprimir, coloque uma régua métrica física sobre a `Barra de verificação de 50 mm` impressa. Se esta medir rigorosamente 50 mm, toda a tabela mural de calibres corresponde à escala real 1:1.

## Perguntas e respostas

### Quantos milímetros tem um piercing de 16 gauge?

Uma joia de piercing de 16 gauge (16G) tem um diâmetro nominal de 1,2 mm (valor calculado a partir da AWG de 1,291 mm, correspondente a cerca de 3/64 de polegada). É o calibre comummente utilizado para perfurações iniciais em cartilagem da orelha como hélix, tragus, conch, daith e rook, bem como para narina e sobrancelha.

### Por que razão o 00G é indicado tanto em 9,5 mm como em 10,0 mm?

Os fabricantes internacionais utilizam padrões distintos para a medida 00 gauge: matrizes americanas derivadas da AWG produzem o 00G entre 9,26 mm e 9,5 mm (3/8 de polegada), ao passo que fabricantes europeus no sistema métrico o arredondam para 10,0 mm certos. Como uma discrepância de 0,5 mm pode originar lacerações no tecido ao introduzir a peça num lóbulo alargado, a tabela lista ambos os valores e aconselha a verificação da embalagem original.

### Como meço a haste de um piercing com o paquímetro digital?

Feche totalmente os bicos de medição do paquímetro digital e prima a tecla de zeramento para calibrar a referência inicial. Coloque as superfícies de medição planas sobre o ponto médio da secção utilizável da barra, mantendo o instrumento perpendicular ao eixo da peça. Execute três medições cuidadosas ao longo da haste evitando roscas, esferas de fecho e topos decorativos.

### Como funciona a calibração do ecrã com um cartão?

Uma vez que monitores e telemóveis apresentam diferentes densidades de píxeis, 100 píxeis num ecrã não cobrem a mesma distância física noutro equipamento. Ao emparelhar o retângulo guia digital com um cartão padronizado ISO/IEC 7810 ID-1 (com 85,60 mm de largura a nível global), a aplicação determina com rigor a relação real de píxeis por milímetro do seu ecrã.

### Um número de gauge superior corresponde a maior ou menor espessura?

No sistema de calibres gauge, um algarismo mais alto indica um fio mais fino. Por exemplo, uma joia de 20 gauge tem uma espessura de 0,8 mm, enquanto um calibre 14 gauge atinge 1,6 mm. Para além do calibre 00 gauge (aproximadamente 9,5 mm a 10,0 mm), a indústria abandona a nomenclatura gauge e passa a designar as peças em milímetros ou frações de polegada.

### Qual a diferença entre a norma AWG e os calibres em piercing?

A American Wire Gauge (AWG) é uma norma industrial histórica concebida para a trefilagem progressiva de fios metálicos. O setor do body piercing adaptou essa escala por hábito prático, embora tenha arredondado as cotas finais para valores métricos diretos (como 1,2 mm para o 16G e 1,6 mm para o 14G) com vista a assegurar a consistência global no fabrico de agulhas e joalharia.

### Posso incorporar este conversor no site do meu estúdio gratuitamente?

Sim, premir o botão de incorporação disponibiliza um código iframe responsivo que qualquer estúdio de tatuagem ou de body piercing pode integrar nas suas páginas Web. O utilitário integrado é integralmente gratuito, funciona sem necessidade de contas de utilizador, não armazena cookies de rastreio e não impõe qualquer encargo financeiro.

### Que calibre gauge inicial se utiliza para perfurações na cartilagem?

Perfurações na cartilagem auricular como hélix, tragus, flat, conch e rook são habitualmente executadas em 16 gauge (1,2 mm) ou 14 gauge (1,6 mm). Recorrer a estas espessuras em detrimento de diâmetros mais reduzidos como 18G ou 20G assegura estabilidade mecânica à joia, previne o risco de corte dos tecidos sob tensão superficial e promove uma cicatrização equilibrada.

## Limites

Esta ferramenta fornece conversões matemáticas e referências convencionais de estúdio, mas não substitui a análise física individual da anatomia humana. Não avalia a tolerância ao edema tecidular na perfuração recente, a elasticidade cutânea, a vascularização regional, o raio de curvatura da cartilagem nem a capacidade de recuperação de cada organismo. A determinação final das medidas da joia deve recair impreterivelmente sobre um body piercer profissional qualificado que examine presencialmente o cliente, inspecione a região e considere a angulação e particularidades de cada procedimento.
