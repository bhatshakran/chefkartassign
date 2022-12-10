import React from 'react';
import { data } from '../lib/data';
import { BsThreeDotsVertical } from 'react-icons/bs';

const H3CLASS = `font-bold p-2 min-w-24 w-1/12 text-xs  break-words`;
const BTNCLASS = 'w-full text-left hover:bg-gray-100 p-2';
const CELLCLASS =
  'border-r border-gray-200 overflow-hidden break-words text-xs py-2 pl-2 pr-1  text-black min-w-24 w-1/12 capitalize';

export const TableCard = ({ info, runCb }) => {
  const rowRef = React.useRef();

  const {
    first_name,
    last_name,
    email,
    gender,
    ip_address,
    airport_code,
    status,
    time,
    mobile,
    area,
    show,
    edit,
  } = info;

  const changeColor = (e) => {
    runCb(e.target.parentNode);
  };

  return (
    <div ref={rowRef} className='flex gap-4 ' onClick={(e) => changeColor(e)}>
      <div className={CELLCLASS}> {first_name}</div>
      <div className={CELLCLASS}> {last_name}</div>
      <div className={CELLCLASS}> {email}</div>
      <div className={CELLCLASS}> {gender}</div>
      <div className={CELLCLASS}> {ip_address}</div>
      <div className={CELLCLASS}> {airport_code}</div>
      <div className={CELLCLASS}> {time}</div>
      <div
        className={`${CELLCLASS} ${
          status === 'true' ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {status}
      </div>
      <div className={CELLCLASS}> {mobile}</div>
      <div className={CELLCLASS}> {area}</div>
      <div className={CELLCLASS}> {show}</div>
      <div className={CELLCLASS}> {edit}</div>
    </div>
  );
};

const DataTable = () => {
  const [showFilterOptions, setShowFilterOptions] = React.useState(false);
  const rowHolderRef = React.useRef();

  const [users, setUsers] = React.useState(() => data);

  const runCb = (val) => {
    const row = val;
    const rowHolder = rowHolderRef.current;
    const rowsArr = Array.from(rowHolder.children);
    rowsArr.forEach((child) => {
      child.children[0].style.backgroundColor = 'white';
    });
    row.style.backgroundColor = 'pink';
    row.style.color = 'white';
  };

  const sortByDesc = () => {
    const sorteddata = [...data].sort((a, b) => {
      if (a.first_name < b.first_name) return 1;
      if (a.first_name > b.first_name) return -1;
      return 0;
    });
    setUsers(sorteddata);

    setShowFilterOptions(false);
  };
  const sortByAsc = () => {
    const sorteddata = [...data].sort((a, b) => {
      if (a.first_name < b.first_name) return -1;
      if (a.first_name > b.first_name) return 1;
      return 0;
    });
    setUsers(sorteddata);
    setShowFilterOptions(false);
  };

  return (
    <div className=' overflow-y-scroll bg-gray-100  w-full  md:flex items-center justify-center  pb-20'>
      <div className='bg-white datatb shadow-md rounded-lg w-5/6 mt-16  overflow-x-scroll '>
        <div className='bg-blue-900 text-center text-white text-4xl pb-12 pt-12'>
          Users{' '}
        </div>
        <div className='flex w-full gap-4 bg-blue-900 text-white px-2'>
          <div className={`${H3CLASS} flex justify-between relative`}>
            <h3 className='text-xs'>First Name</h3>
            <button
              className='text-lg'
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
              <BsThreeDotsVertical />
            </button>
            <div
              className={` top-10  z-20 left-12 bg-white w-40 h-40  p-3 flex flex-col gap-y-4 justify-center text-blue-900 rounded-md shadow-md ${
                showFilterOptions === false ? 'hidden' : 'absolute'
              }`}
            >
              <button
                className={BTNCLASS}
                onClick={() => {
                  setUsers(data);
                  setShowFilterOptions(false);
                }}
              >
                UNSORT
              </button>
              <button className={BTNCLASS} onClick={sortByAsc}>
                Sort by ASC
              </button>
              <button className={BTNCLASS} onClick={sortByDesc}>
                Sort by DSC
              </button>
            </div>
          </div>
          <div className={H3CLASS}>Last Name</div>
          <div className={H3CLASS}>Email</div>
          <div className={H3CLASS}>Gender</div>
          <div className={H3CLASS}>Ip Address</div>
          <div className={H3CLASS}>Airport Code</div>
          <div className={H3CLASS}>Time</div>
          <div className={H3CLASS}>Status</div>
          <div className={H3CLASS}>Mobile</div>
          <div className={H3CLASS}>Area</div>
          <div className={H3CLASS}>Show </div>
          <div className={H3CLASS}>Edit</div>
        </div>
        <div ref={rowHolderRef} className='border-t flex flex-col '>
          {users.map((item, idx) => {
            return (
              <div className='cursor-pointer' key={idx}>
                <TableCard info={item} runCb={runCb} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
