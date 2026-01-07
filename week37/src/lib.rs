use solana_program::{
    account_info::{AccountInfo, next_account_info},
    entrypoint::ProgramResult,
    entrypoint,
    pubkey::Pubkey,
    program::invoke_signed,
};
use solana_system_interface::instruction as system_instruction;


entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    // creating new PDA onchain
    // for that we need user account and system program

    let iter = &mut accounts.iter();
    let pda = next_account_info(iter)?;
    let user_acc = next_account_info(iter)?;
    let system_program = next_account_info(iter)?;

    let seeds = &[user_acc.key.as_ref(), b"user"];

    let (pda_pub_key, bump) = Pubkey::find_program_address(seeds, program_id);

    let ix = system_instruction::create_account(user_acc.key, pda.key, 1000000000, 8, program_id);

    invoke_signed(&ix, accounts, &[seeds, &[&[bump]]]);
    
    Ok(())
}