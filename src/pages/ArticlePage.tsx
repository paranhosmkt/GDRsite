import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, Share2, BookOpen, MessageSquare } from "lucide-react";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const whatsappMessage = encodeURIComponent(
    "Olá! Li o artigo 'Os Limites Constitucionais da Reforma da Tributação sobre o Consumo' e gostaria de consultar a equipe tributária."
  );

  return (
    <article className="pt-36 sm:pt-44 md:pt-48 pb-20 min-h-screen bg-white text-gdr-dark font-sans selection:bg-gdr-beige selection:text-gdr-dark">
      {/* Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="mb-8 flex items-center justify-between border-b border-gdr-border pb-4">
          <Link
            to="/materiais"
            className="inline-flex items-center space-x-2 text-xs uppercase font-semibold tracking-wider text-gdr-dark/70 hover:text-gdr-beige transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Materiais</span>
          </Link>

          <div className="text-[11px] text-gdr-dark/50 tracking-wider uppercase font-medium">
            <span>Materiais</span>
            <span className="mx-2">•</span>
            <span className="text-gdr-dark/80">Artigo</span>
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="inline-block bg-gdr-beige/20 text-gdr-dark border border-gdr-beige/50 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-6">
            Direito Tributário • Artigo
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gdr-dark leading-tight mb-6">
            OS LIMITES CONSTITUCIONAIS DA REFORMA DA TRIBUTAÇÃO SOBRE O CONSUMO
          </h1>

          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-gdr-dark/70 border-y border-gdr-border/60 py-4 font-sans">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gdr-beige" />
              <span className="font-medium text-gdr-dark">Por Luciano Daniel da Veiga</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gdr-beige" />
              <span>12 min de leitura</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gdr-beige" />
              <span>2026</span>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none text-gdr-dark/85 font-sans leading-relaxed space-y-6">
          
          {/* Lead Paragraph */}
          <p className="text-base sm:text-lg font-normal leading-relaxed text-gdr-dark bg-gdr-gray/40 border-l-4 border-gdr-beige p-5 sm:p-6 rounded-r-sm">
            A reforma da tributação sobre o consumo representa uma das mais profundas transformações do Sistema Tributário Nacional desde a Constituição de 1988. A simplificação do modelo anterior e a busca por maior racionalidade econômica são objetivos legítimos, mas nenhum deles autoriza o afastamento dos limites impostos pela própria Constituição. As questões aqui examinadas não representam juízo de conveniência sobre a reforma, nem resistência ao modelo do imposto sobre valor agregado. Partem da premissa de que a modernização da tributação do consumo só se legitima quando observa os princípios estruturantes do sistema constitucional tributário. Quatro frentes concentram essa tensão: a natureza jurídica da CBS e a delegação normativa ao Comitê Gestor do IBS; os efeitos sobre a capacidade contributiva e a neutralidade; o regime de estorno de créditos da LC 214/2025; e a ampliação da materialidade do IBS e da CBS além dos limites constitucionais.
          </p>

          {/* Section 1 */}
          <section className="pt-6 space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gdr-dark pt-4 border-b border-gdr-border/60 pb-2">
              O nome não muda a natureza do tributo
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
              Antes de examinar os efeitos econômicos da reforma, é preciso enfrentar sua identidade jurídica. O legislador batizou a CBS de contribuição, mas essa opção terminológica não vincula o intérprete: o regime jurídico de um tributo decorre de sua estrutura normativa de hipótese de incidência, base de cálculo e destinação, não do nome que lhe é atribuído.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
              Não se trata de posição isolada. A doutrina majoritária, do saudoso Paulo de Barros Carvalho a Roque Antonio Carrazza e Sacha Calmon Navarro Coelho, converge nesse mesmo sentido: a natureza jurídica do tributo se revela pelo binômio hipótese de incidência e base de cálculo, sendo irrelevante, para esse fim, o <em>nomen juris</em> que o legislador lhe atribui — entendimento que, aliás, o próprio art. 4º do Código Tributário Nacional consagra.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
              Submetida a esse exame, a CBS não se enquadra em nenhuma espécie de contribuição prevista pela Constituição: não é intervenção no domínio econômico, não se volta a categorias profissionais, não custeia a seguridade social nos moldes do art. 195 nem se confunde com iluminação pública ou sistema S. O que se tem, na essência, é um imposto, e compartilha com o IBS, nos termos do art. 4º da LC 214/2025, a mesma hipótese de incidência, base de cálculo e contribuintes.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
              A consequência não é apenas terminológica. Fosse de fato contribuição, a CBS deveria observância ao art. 195, § 4º c/c 154, I, da Constituição: lei complementar, base distinta dos impostos já discriminados e partilha com Estados e DF. Nada disso ocorreu: sua alíquota é fixada por lei ordinária e sua estrutura replica a do IBS. Sendo, em essência, imposto, deveria também observar a capacidade contributiva, exigência que a EC 132/2023 não previu. A mesma reserva se impõe à delegação ao Comitê Gestor do IBS, que a LC 214/2025 autoriza a disciplinar, por regulamento, elementos que deveriam permanecer sob reserva legal. A legalidade tributária é mais estrita que a legalidade administrativa genérica e não comporta que hipótese de incidência, base de cálculo, alíquota ou sujeito passivo fiquem à mercê de órgão infralegal.
            </p>
          </section>

          {/* Section 2 */}
          <section className="pt-6 space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gdr-dark pt-4 border-b border-gdr-border/60 pb-2">
              Neutralidade e isonomia sob tensão
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
              A neutralidade é um dos principais fundamentos dos impostos sobre valor agregado: não apenas evita a tributação em cascata, mas impede que o tributo influencie artificialmente as decisões econômicas dos agentes. Em um IVA plenamente funcional, a não cumulatividade assegura o aproveitamento integral dos créditos ao longo da cadeia, permitindo que a carga seja suportada pelo consumidor final sem distorcer escolhas de produção ou organização empresarial.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
              Essa lógica dialoga diretamente com a isonomia e a capacidade contributiva. Ainda que os tributos sobre consumo incidam sobre manifestações objetivas de riqueza, a Constituição não autoriza que sua estrutura produza desigualdades arbitrárias entre contribuintes sob o mesmo regime jurídico — e é aí que a disciplina da LC 214/2025 preocupa. Embora apresentado como neutro, o modelo produz efeitos bem distintos conforme a estrutura de custos de cada atividade. Empresas intensivas em insumos recuperam parcela significativa do imposto das etapas anteriores; setores cujo principal fator é a mão de obra — como empresas de tecnologia, construção civil, serviços de limpeza, consultorias, entre outros — enfrentam limitações severas ao crédito, suportando carga efetiva proporcionalmente superior. A diferença não decorre da capacidade econômica do contribuinte, mas da própria arquitetura do tributo: dois contribuintes sob a mesma incidência passam a suportar cargas distintas apenas em razão de como organizam sua atividade — distorção que a Constituição não autoriza sem fundamento suficiente.
            </p>

            {/* Subsection */}
            <div className="bg-gdr-gray/30 p-5 rounded-sm my-4 border-l-2 border-gdr-dark">
              <h3 className="text-lg font-serif font-semibold text-gdr-dark mb-2">
                O estorno de créditos e a cumulatividade residual
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
                O regime de estorno de créditos do art. 51 da LC 214/2025 torna essa tensão ainda mais visível. O dispositivo determina, ressalvadas hipóteses específicas, o estorno proporcional de créditos sempre que a operação seja beneficiada por isenção ou imunidade. A técnica tem racionalidade arrecadatória, mas, do ponto de vista econômico, produz efeito diverso: parcela do tributo já incidente deixa de ser recuperada e se incorpora ao custo das operações seguintes. Forma-se, assim, uma cumulatividade residual incompatível com a lógica clássica do IVA — o tributo passa a carregar, ainda que parcialmente, tributação de etapas anteriores.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85 mt-3">
                Não é retorno ao sistema cumulativo, mas uma exceção que fragiliza justamente o princípio cuja preservação foi um dos principais argumentos em favor da reforma. As consequências vão além da técnica tributária: a impossibilidade de recuperar créditos integralmente interfere na formação de preços, altera a competitividade entre agentes e influencia decisões que, em modelo verdadeiramente neutro, deveriam ser indiferentes à tributação. A neutralidade, por isso, é instrumento de concretização da própria igualdade tributária e, quando o desenho do tributo passa a favorecer certos modelos de negócio, exige controle mais rigoroso.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="pt-6 space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gdr-dark pt-4 border-b border-gdr-border/60 pb-2">
              Os limites da materialidade do IBS e da CBS
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
              O mesmo cuidado se impõe à delimitação do fato gerador do IBS e da CBS. A simplificação do sistema não amplia, por si só, a competência constitucional para instituir novas hipóteses de incidência: a EC 132 reorganizou a tributação sobre o consumo, mas não alterou a natureza constitucional da competência tributária. O constituinte ampliou o modelo de tributação sobre bens e serviços; não conferiu ao legislador complementar liberdade para redefinir os fatos econômicos alcançados pelo novo tributo. Uma coisa é disciplinar um imposto cuja materialidade a Constituição definiu; outra é usar a lei complementar para expandir essa materialidade — e é essa tensão que emerge em alguns dispositivos da LC 214/2025.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
              A incidência sobre operações não onerosas é exemplo eloquente: o IVA tributa o valor acrescido em cada etapa da circulação de bens e serviços, e nas operações gratuitas esse pressuposto não se verifica. O legislador pode estabelecer hipóteses equiparadas contra planejamentos abusivos, mas essas equiparações não podem desnaturar a própria materialidade do tributo.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
              A mesma preocupação aparece na tentativa de ampliar o conceito jurídico de bem: os conceitos empregados pela Constituição delimitam competências, e admitir que a lei os redefina livremente equivaleria a permitir que o legislador ampliasse, por via indireta, sua própria competência. Daí decorrem consequências práticas: a alienação de bens do ativo imobilizado, fora da atividade que caracteriza o contribuinte, dificilmente se confunde com circulação de bens; e a movimentação de mercadorias entre estabelecimentos da mesma pessoa jurídica não revela transferência de riqueza, mas mero deslocamento interno.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
              O mesmo raciocínio vale quando a nova legislação aproxima o IBS e a CBS de materialidades já reservadas ao ITCMD, ao ITBI e ao IOF. A repartição constitucional de competências não é mera técnica administrativa — é garantia do pacto federativo e limite ao poder de tributar. Sempre que a disciplina infraconstitucional se aproxima desses fatos econômicos, é preciso verificar se a distribuição de competências permanece preservada ou se há expansão indireta da materialidade do novo imposto.
            </p>
          </section>

          {/* Section 4 */}
          <section className="pt-6 space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gdr-dark pt-4 border-b border-gdr-border/60 pb-2">
              Conclusão
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
              A reforma da tributação sobre o consumo representa avanço institucional relevante e responde a problemas históricos do sistema tributário brasileiro. Mas a simplificação não é valor absoluto: em um Estado Constitucional de Direito, ela só se legitima quando preserva as garantias que estruturam o próprio exercício da tributação.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
              As questões aqui examinadas não negam os méritos da reforma nem defendem o modelo anterior. Sustentam algo mais simples e mais exigente: a modernização do consumo não dispensa a observância dos princípios constitucionais que limitam o poder de tributar. É provável que muitas dessas dúvidas cheguem ao Supremo Tribunal Federal nos próximos anos; reformas constitucionais dessa dimensão raramente encerram debates, em regra inauguram uma nova etapa de interpretação.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85 font-medium text-gdr-dark">
              Talvez seja essa a principal consequência da Emenda Constitucional nº 132: mais do que substituir tributos, ela recolocou no centro do debate uma questão permanente do Direito Tributário — até que ponto a busca por eficiência fiscal pode avançar sem comprometer as garantias constitucionais do contribuinte? A resposta será construída, sobretudo, pela Constituição.
            </p>
          </section>

          {/* References Section */}
          <section className="mt-12 pt-8 border-t border-gdr-border">
            <h3 className="text-sm uppercase tracking-widest font-semibold text-gdr-dark/70 mb-4 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-gdr-beige" />
              <span>Referências Bibliográficas e Normativas</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gdr-dark/70 font-mono bg-gdr-gray/20 p-5 rounded-sm border border-gdr-border/50">
              <li>BRASIL. <strong>Constituição da República Federativa do Brasil de 1988</strong>. Brasília, DF: Presidência da República, 1988.</li>
              <li>BRASIL. <strong>Emenda Constitucional nº 132, de 20 de dezembro de 2023</strong>. Altera o Sistema Tributário Nacional. Brasília, DF: Presidência da República, 2023.</li>
              <li>BRASIL. <strong>Lei Complementar nº 214, de 16 de janeiro de 2025</strong>. Institui o Imposto sobre Bens e Serviços (IBS), a Contribuição Social sobre Bens e Serviços (CBS) e o Imposto Seletivo (IS). Brasília, DF: Presidência da República, 2025.</li>
              <li>CARVALHO, Paulo de Barros. <strong>Curso de Direito Tributário</strong>. 32. ed. São Paulo: Noeses, 2023.</li>
              <li>CARRAZZA, Roque Antônio. <strong>Curso de Direito Constitucional Tributário</strong>. 36. ed. São Paulo: Malheiros/JusPodivm, 2025.</li>
              <li>COELHO, Sacha Calmon Navarro. <strong>Curso de Direito Tributário Brasileiro</strong>. 18. ed. Rio de Janeiro: Forense, 2022.</li>
            </ul>
          </section>

        </div>

        {/* Author Box ("Sobre o Autor") */}
        <section className="mt-16 bg-gradient-to-br from-gdr-gray/60 to-gdr-gray/20 border border-gdr-border/80 p-6 sm:p-8 rounded-sm shadow-sm">
          <div className="text-xs uppercase font-semibold tracking-widest text-gdr-beige mb-6 pb-2 border-b border-gdr-border/60">
            Sobre o Autor
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Circular photo */}
            <div className="relative flex-shrink-0">
              <img
                src="https://i.ibb.co/v4pWJX5w/Whats-App-Image-2026-07-21-at-07-50-21.jpg"
                alt="Luciano Daniel da Veiga"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-gdr-beige shadow-md"
              />
            </div>

            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-xl font-serif font-bold text-gdr-dark">
                Luciano Daniel da Veiga
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-gdr-beige">
                Advogado Tributarista • Sócio e Coordenador da Área Tributária
              </p>
              <p className="text-xs sm:text-sm text-gdr-dark/80 font-light leading-relaxed">
                Luciano Daniel da Veiga é advogado tributarista, especialista e pós-graduado em Direito Tributário, com 20 anos de experiência nas áreas Tributária e Empresarial. É sócio e Coordenador da área tributária do escritório Gouvêa dos Reis Advogados, além de Assessor Jurídico Tributário e membro do Comitê Jurídico da FACISC e Conselheiro da 3ª Câmara de Julgamento do Tribunal Administrativo Tributário de Santa Catarina (TAT/SC). Ex-Procurador Municipal, atua ainda como palestrante e instrutor de cursos na área tributária.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Actions / Call to Action */}
        <div className="mt-12 pt-8 border-t border-gdr-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/materiais"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gdr-gray hover:bg-gdr-dark hover:text-white text-gdr-dark border border-gdr-border px-6 py-3 text-xs uppercase font-semibold tracking-wider transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ver Todos os Materiais</span>
          </Link>

          <a
            href={`https://wa.me/5547996320088?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gdr-dark hover:bg-gdr-beige hover:text-gdr-dark text-white border border-gdr-dark px-6 py-3 text-xs uppercase font-semibold tracking-wider transition-colors duration-300 shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Falar com o Autor / Consultar Área Tributária</span>
          </a>
        </div>

      </div>
    </article>
  );
}
