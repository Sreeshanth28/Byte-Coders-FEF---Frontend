// import { sample } from 'lodash';

// ----------------------------------------------------------------------

// export const users = [...Array(24)].map((_, index) => ({
//   id: faker.string.uuid(),
//   avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
//   name: faker.person.fullName(),
//   company: faker.company.name(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'banned']),
//   // role: sample([
//   //   'Leader',
//   //   'Hr Manager',
//   //   'UI Designer',
//   //   'UX Designer',
//   //   'UI/UX Designer',
//   //   'Project Manager',
//   //   'Backend Developer',
//   //   'Full Stack Designer',
//   //   'Front End Developer',
//   //   'Full Stack Developer',
//   // ]),
// }));

async function fetchBnplData() {
  try {
    const response = await fetch('http://127.0.0.1:8000/getallcustomerdetails/');
    console.log(response);
    const data = await response.json();
    console.log(data.allCustomers);
    return data.allCustomers;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

let users = [];

async function initializeUsers() {
  // Check if the current URL path is '/user'
  if (window.location.pathname === '/dashboard/user') {
    const bnplData = await fetchBnplData();
    users = bnplData.map((user, index) => ({
      id: user.bnplId,
      avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
      name: user.bnplId,
      company: user.orgId ? user.orgId : 'N/A',
      isVerified: user.orgId !== null,
      status: user.Status ? user.Status.toLowerCase() : 'active',
    }));
    console.log(users);
  }
}

// Only initialize if we're on the '/user' page
if (window.location.pathname === '/dashboard/user') {
  initializeUsers();
}

export { users };