export default (subject, did, data) => {
  console.log(`[${subject}: ${did}] ${JSON.stringify(data)}`);
};

export const sub = {
  firebase: 'Firebase',
};
