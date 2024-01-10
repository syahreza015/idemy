import { create } from 'zustand';

interface IDrawerStore {
  openDrawer: boolean;
  setOpenDrawer: (newState: boolean) => void;
}

export const useDrawerStore = create<IDrawerStore>((set) => ({
  openDrawer: false,
  setOpenDrawer: (newState) => {
    set((state) => ({
      openDrawer: (state.openDrawer = newState),
    }));
  },
}));

interface IFormStore {
  openForm: boolean;
  formVariant: formType | undefined;
  setFormVariant: (newState: formType | undefined) => void;
  setOpenForm: (newState: boolean) => void;
}

export const useFormStore = create<IFormStore>((set) => ({
  openForm: false,
  formVariant: undefined,
  setOpenForm: (newState) => {
    set((state) => ({
      openForm: (state.openForm = newState),
    }));
  },
  setFormVariant: (newState) => {
    set((state) => ({
      formVariant: (state.formVariant = newState),
    }));
  },
}));

interface IProfileStore {
  openProfile: boolean;
  setOpenProfile: (newState: boolean) => void;
}

export const useProfileStore = create<IProfileStore>((set) => ({
  openProfile: false,
  setOpenProfile: (newState) => {
    set((state) => ({
      openProfile: (state.openProfile = newState),
    }));
  },
}));

interface IAlertStore {
  openAlert: boolean;
  setOpenAlert: (newState: boolean) => void;
  alertVariant: AlertVariant | undefined;
  setAlertVariant: (newState: AlertVariant | undefined) => void;
  alertMessage: string | undefined;
  setAlertMessage: (newState: string | undefined) => void;
}

export const useAlertStore = create<IAlertStore>((set) => ({
  openAlert: false,
  setOpenAlert: (newState) => {
    set((state) => ({
      openAlert: (state.openAlert = newState),
    }));
  },
  alertVariant: undefined,
  setAlertVariant: (newState) => {
    set((state) => ({
      alertVariant: (state.alertVariant = newState),
    }));
  },
  alertMessage: undefined,
  setAlertMessage: (newState) => {
    set((state) => ({
      alertMessage: (state.alertMessage = newState),
    }));
  },
}));

interface IClassMemberStore {
  openList: boolean;
  setOpenList: (newState: boolean) => void;
  listVariant: ClassMember | undefined;
  setListVariant: (newState: ClassMember | undefined) => void;
}

export const useClassMemberStore = create<IClassMemberStore>((set) => ({
  openList: false,
  setOpenList: (newState) => {
    set((state) => ({
      openList: (state.openList = newState),
    }));
  },
  listVariant: undefined,
  setListVariant: (newState) => {
    set((state) => ({
      listVariant: (state.listVariant = newState),
    }));
  },
}));

interface IProfileEditStore {
  editProfile: boolean;
  setEditProfile: (newState: boolean) => void;
}

export const useProfileEditStore = create<IProfileEditStore>((set) => ({
  editProfile: false,
  setEditProfile: (newState) => {
    set((state) => ({
      editProfile: (state.editProfile = newState),
    }));
  },
}));
