export interface Company {
  company_name: string;
  address: string;
  inn: string;
  signature: string;
  buyer: string;
  buyer_base: string;
}

export interface Role {
  id: number;
}

export interface Attachment {
  id: number,
  path: string;
  filename: string;
}

export interface Me {
  id: number | null;
  company: Company | null;
  name: string;
  email0: string;
  phone0: string;
  phone_confirmed: boolean;
  email_confirmed: boolean;
  username: string;
  show_success_notifications: boolean;
  roles: Role[];
  ap_user: boolean;
  outlet: boolean;
  attachments?: Attachment[];
  lawyer_comments?: [string, string][];
  documents_comment?: string;

  [key: string]: unknown;
}

export const initialMe: Me = {
  id: null,
  company: {
    company_name: '',
    address: '',
    inn: '',
    signature: '',
    buyer: '',
    buyer_base: ''
  },
  name: '',
  email0: '',
  phone0: '',
  phone_confirmed: false,
  email_confirmed: false,
  username: '',
  show_success_notifications: true,
  roles: [],
  ap_user: false,
  outlet: false,
  attachments: [],
  lawyer_comments: [],
  documents_comment: ''
};
