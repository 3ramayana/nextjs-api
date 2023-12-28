//import next request and response
import { NextResponse } from 'next/server';

//import prisma client
import prisma from '../../../../../prisma/client';

export async function GET(request, { params }) {
  //get params id
  const id = parseInt(params.id);

  //get detail post
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    //return response JSON
    return NextResponse.json(
      {
        sucess: true,
        message: 'Detail Data Todo Not Found!',
        data: null,
      },
      {
        status: 404,
      }
    );
  }

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: 'Detail Data Todo',
      data: todo,
    },
    {
      status: 200,
    }
  );
}

export async function PATCH(request, { params }) {
  //get params id
  const id = parseInt(params.id);

  //get request data
  const { title, isFinished } = await request.json();

  //update data
  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      isFinished,
      updateAt: new Date(),
    },
  });

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: 'Data Todo Updated!',
      data: todo,
    },
    {
      status: 200,
    }
  );
}

export async function DELETE(request, { params }) {
  //get params id
  const id = parseInt(params.id);

  //delete data
  await prisma.todo.delete({
    where: {
      id,
    },
  });

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: 'Data Todo Deleted!',
    },
    {
      status: 200,
    }
  );
}
