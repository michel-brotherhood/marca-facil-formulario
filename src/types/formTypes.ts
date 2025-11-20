export interface FormState {
  currentStep: number;
  cliente: {
    nomeCompleto: string;
    cpf: string;
    telefone: string;
    email: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    preferenciaContato: "whatsapp" | "email";
    rgClienteUrl: string;
    rgClienteFile?: File; // Arquivo real
  };
  titular: {
    tipo: "pf" | "pj";
    possuiSociedade: boolean | null;
    representante: "titular" | "procurador" | "sim" | "nao";
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    profissao: string;
    rgTitularUrl: string;
    rgTitularFile?: File; // Arquivo real
    diplomaUrl: string;
    diplomaFile?: File; // Arquivo real
    procuracaoUrl: string;
    procuracaoFile?: File; // Arquivo real
    cnpj: string;
    dadosCnpjCorretos: boolean | null;
    dadosCnpj?: {
      razaoSocial: string;
      nomeFantasia: string;
      cnae: string;
      situacao: string;
      porte: string;
      naturezaJuridica: string;
      logradouro: string;
      numero: string;
      complemento: string;
      bairro: string;
      municipio: string;
      uf: string;
      cep: string;
    };
  };
  marca: {
    nome: string;
    utilizacao: "produtos" | "servicos" | "outros" | "";
    atividades: string;
    possuiLogo: boolean | null;
    logoUrl: string;
    logoFile?: File; // Arquivo real
  };
  termos: {
    aceitaPolitica: boolean;
  };
}

export const initialFormState: FormState = {
  currentStep: 1,
  cliente: {
    nomeCompleto: "",
    cpf: "",
    telefone: "",
    email: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    preferenciaContato: "whatsapp",
    rgClienteUrl: "",
  },
  titular: {
    tipo: "pf",
    possuiSociedade: null,
    representante: "titular",
    nomeCompleto: "",
    cpf: "",
    dataNascimento: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    profissao: "",
    rgTitularUrl: "",
    diplomaUrl: "",
    procuracaoUrl: "",
    cnpj: "",
    dadosCnpjCorretos: null,
  },
  marca: {
    nome: "",
    utilizacao: "",
    atividades: "",
    possuiLogo: null,
    logoUrl: "",
  },
  termos: {
    aceitaPolitica: false,
  },
};
