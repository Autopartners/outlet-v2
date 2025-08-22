import type { Me } from './types';

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
  documents_comment: '',
  phone_confirmation_sent_at: '',
  email_confirmation_sent_at: ''
};