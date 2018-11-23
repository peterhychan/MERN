import User from '../components/User';
import Link from 'next/link';


const me = props => (
	<User>
	{({ data: { me } }) => (
		<div style={{textAlign:"center"}}>
			<div style={{fontSize:"1.5em"}}>{me.name || ''}</div>
			<hr/>
			<Link href="/reset">
				<a style={{textDecoration: "underline",  color: "red"}}>
					Reset Password
				</a>
			</Link>
			<div><span style={{textDecoration: "underline"}}>Email:</span> {me.email || ''}</div>
			<div><span style={{textDecoration: "underline"}}>UID:</span> {me.id || ''}</div>
			<div><span style={{textDecoration: "underline"}}>Role(s):</span> 
			{me.permissions.map(role => <div style={{fontSize: "0.7em"}}>{role}</div>)}
			</div>

		</div>
	)}
	</User>
);

export default me;
