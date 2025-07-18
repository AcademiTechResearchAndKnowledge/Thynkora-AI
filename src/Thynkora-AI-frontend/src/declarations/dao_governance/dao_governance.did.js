export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getProposals' : IDL.Func([], [IDL.Vec(IDL.Text)], []),
  });
};
export const init = ({ IDL }) => { return []; };
