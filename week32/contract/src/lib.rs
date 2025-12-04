use solana_program::{
    account_info::{AccountInfo, next_account_info},
    msg,
    entrypoint::ProgramResult,
    entrypoint,
    pubkey::Pubkey,
};

use::borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshDeserialize, BorshSerialize)]
enum InstructionType {
    Increment(u32),
    Decrement(u32),
}

#[derive(BorshDeserialize, BorshSerialize)]
struct Counter {
    count: u32,
}

entrypoint!(counter_contract);

pub fn counter_contract(
    programId: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let acc = next_account_info(&mut accounts.iter())?;
    let mut counter_data = Counter::try_from_slice(&acc.data.borrow())?;

    let instruction_type = InstructionType::try_from_slice(instruction_data)?;

    match instruction_type {
        InstructionType::Decrement(value) => {
            counter_data.count -= value;
        },
        InstructionType::Increment(value) => {
            counter_data.count += value;
        },
    }

    counter_data.serialize(&mut *acc.data.borrow_mut());

    Ok(())
}