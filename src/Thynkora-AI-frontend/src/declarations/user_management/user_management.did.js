export const idlFactory = ({ IDL }) => {
  const UserId = IDL.Principal;
  const Profile = IDL.Record({
    'id' : UserId,
    'timezone' : IDL.Text,
    'createdAt' : IDL.Int,
    'emergencyContact' : IDL.Opt(IDL.Text),
    'isAnonymous' : IDL.Bool,
    'language' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : Profile, 'err' : IDL.Text });
  return IDL.Service({
    'createProfile' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
        [Result],
        [],
      ),
    'getProfile' : IDL.Func([], [IDL.Opt(Profile)], ['query']),
    'updateProfile' : IDL.Func(
        [IDL.Opt(IDL.Text), IDL.Opt(IDL.Text), IDL.Opt(IDL.Text)],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
