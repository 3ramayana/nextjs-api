//import next request and response
import { NextResponse } from 'next/server';

//import prisma client
import prisma from '../../../../prisma/client';

export async function GET() {
  //get all posts
  const todos = await prisma.todo.findMany();

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: 'List Data Todo',
      data: todos,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request) {
  //get all request
  const { title, isFinished } = await request.json();

  //create data post
  const todo = await prisma.todo.create({
    data: {
      title,
      isFinished,
    },
  });

  //return response JSON
  return NextResponse.json(
    {
      success: true,
      message: 'Todo Created Successfully!',
      data: todo,
    },
    { status: 201 }
  );
}
