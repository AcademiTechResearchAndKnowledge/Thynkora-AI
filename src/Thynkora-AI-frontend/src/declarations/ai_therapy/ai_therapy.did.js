export const idlFactory = ({ IDL }) => {
  const Message = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Text,
    'userId' : IDL.Principal,
    'isUser' : IDL.Bool,
    'timestamp' : IDL.Int,
    'riskLevel' : IDL.Opt(IDL.Nat),
    'supportActions' : IDL.Vec(IDL.Text),
  });
  const Result_1 = IDL.Variant({ 'ok' : Message, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  return IDL.Service({
    'sendMessage' : IDL.Func([IDL.Text, IDL.Text], [Result_1], []),
    'startSession' : IDL.Func([], [Result], []),
    'triggerEmergencyResponse' : IDL.Func([IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
