import { useEffect, useState } from 'react';
import Message from './Message';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setEmails } from '../redux/appSlice';

const Messages = () => {
  const { searchText, emails } = useSelector((store) => store.app);
  const [filterEmail, setFilterEmail] = useState(emails);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, 'emails'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => {
        const email = doc.data();
        return {
          ...email,
          id: doc.id,
          createdAt: email.createdAt?.toDate().toISOString() || '', // Ensure createdAt is serialized
        };
      });
      dispatch(setEmails(allEmails));
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe when component unmounts
  }, [dispatch]);

  useEffect(() => {
    const filteredEmail = emails?.filter((email) => {
      return (
        email.subject?.toLowerCase().includes(searchText.toLowerCase()) ||
        email.to?.toLowerCase().includes(searchText.toLowerCase()) ||
        email.message?.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilterEmail(filteredEmail);
  }, [searchText, emails]);

  return (
    <div>
      {filterEmail?.map((email) => (
        <Message key={email.id} email={email} />
      ))}
    </div>
  );
};

export default Messages;
