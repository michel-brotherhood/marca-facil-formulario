import { FormState } from "@/types/formTypes";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

interface Etapa4Props {
  formData: FormState;
  updateTermos: (aceita: boolean) => void;
}

export const Etapa4_Confirmacao = ({ formData, updateTermos }: Etapa4Props) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Confirmação</h2>
        <p className="text-muted-foreground">Revise suas informações antes de enviar</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="cliente">
          <AccordionTrigger>Dados do Cliente</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Nome:</span> {formData.cliente.nomeCompleto}</p>
              <p><span className="font-medium">CPF:</span> {formData.cliente.cpf}</p>
              <p><span className="font-medium">E-mail:</span> {formData.cliente.email}</p>
              <p><span className="font-medium">Telefone:</span> {formData.cliente.telefone}</p>
              <p>
                <span className="font-medium">Endereço:</span>{" "}
                {formData.cliente.logradouro}, {formData.cliente.numero}
                {formData.cliente.complemento && ` - ${formData.cliente.complemento}`} -{" "}
                {formData.cliente.bairro}, {formData.cliente.cidade}/{formData.cliente.uf} -{" "}
                CEP: {formData.cliente.cep}
              </p>
              <p>
                <span className="font-medium">Preferência de contato:</span>{" "}
                {formData.cliente.preferenciaContato === "whatsapp" ? "WhatsApp" : "E-mail"}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="titular">
          <AccordionTrigger>Dados do Titular</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Tipo:</span>{" "}
                {formData.titular.tipo === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}
              </p>
              
              {formData.titular.tipo === "pf" ? (
                <>
                  <p><span className="font-medium">Nome:</span> {formData.titular.nomeCompleto}</p>
                  <p><span className="font-medium">CPF:</span> {formData.titular.cpf}</p>
                  <p>
                    <span className="font-medium">Data de Nascimento:</span>{" "}
                    {formData.titular.dataNascimento}
                  </p>
                  <p><span className="font-medium">Profissão:</span> {formData.titular.profissao}</p>
                  <p>
                    <span className="font-medium">Possui sociedade:</span>{" "}
                    {formData.titular.possuiSociedade ? "Sim" : "Não"}
                  </p>
                </>
              ) : (
                <>
                  <p><span className="font-medium">CNPJ:</span> {formData.titular.cnpj}</p>
                  {formData.titular.dadosCnpj && (
                    <>
                      <p>
                        <span className="font-medium">Razão Social:</span>{" "}
                        {formData.titular.dadosCnpj.razaoSocial}
                      </p>
                      {formData.titular.dadosCnpj.nomeFantasia && (
                        <p>
                          <span className="font-medium">Nome Fantasia:</span>{" "}
                          {formData.titular.dadosCnpj.nomeFantasia}
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="marca">
          <AccordionTrigger>Dados da Marca</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Nome da Marca:</span> {formData.marca.nome}</p>
              <p>
                <span className="font-medium">Utilização:</span>{" "}
                {formData.marca.utilizacao === "produtos"
                  ? "Produtos"
                  : formData.marca.utilizacao === "servicos"
                  ? "Serviços"
                  : "Outros"}
              </p>
              <p><span className="font-medium">Atividades:</span> {formData.marca.atividades}</p>
              <p>
                <span className="font-medium">Possui Logo:</span>{" "}
                {formData.marca.possuiLogo ? "Sim" : "Não"}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
            ❓ Perguntas Frequentes
          </h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm font-medium">
                1. Taxas Oficiais do INPI
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Nossa equipe analisará sua solicitação e entrará em contato para apresentar uma proposta personalizada.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm font-medium">
                2. Classes Adicionais
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Se sua marca precisar ser registrada em múltiplas classes, nossa equipe informará sobre as opções disponíveis e custos adicionais durante o atendimento.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm font-medium">
                3. Marca Não Registrável
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                E se na análise eu descobrir que não posso registrar essa marca? Não se preocupe, te orientamos e aguardamos até você definir uma nova marca, sem nenhuma cobrança adicional. Confira como funciona o{" "}
                <a 
                  href="https://marcafacil.legal/passo-a-passo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  PASSO A PASSO
                </a>{" "}
                em nosso site.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-sm font-medium">
                4. Processo Indeferido
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                E se o meu processo for INDEFERIDO? Nós fazemos um novo processo sem cobrar pelo serviço ou devolvemos o seu dinheiro.
                <br />
                <span className="text-xs italic">* Não se aplica para taxas do INPI</span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-sm font-medium">
                5. Oposição ao Processo
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                E se o meu processo sofrer uma OPOSIÇÃO? Ao menos que na nossa análise nós tenhamos apontado essa possibilidade e você tenha decidido correr esse risco, nós não cobramos para defender a sua marca.
                <br />
                <span className="text-xs italic">* Não se aplica para taxas do INPI</span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="flex items-start space-x-2 p-4 border border-border rounded-lg">
        <Checkbox
          id="termos"
          checked={formData.termos.aceitaPolitica}
          onCheckedChange={(checked) => updateTermos(checked === true)}
        />
        <Label htmlFor="termos" className="cursor-pointer leading-tight">
          Li e concordo com a nossa{" "}
          <a 
            href="https://marcafacil.legal/politicas" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            POLÍTICA DE TRABALHO
          </a>
          . *
        </Label>
      </div>
    </div>
  );
};
